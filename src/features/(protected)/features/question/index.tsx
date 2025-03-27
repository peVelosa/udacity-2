import { User } from "@/@types";
import { _getUsers, _saveQuestionAnswer } from "@/server/_DATA";
import { login } from "@/store/auth/auth.reducer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchQuestionById, unselectQuestion } from "@/store/pool/pool.reducer";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

enum OPTIONS {
  optionOne = "Option One",
  optionTwo = "Option Two",
}

const DonutChart = ({
  percentage1,
  percentage2,
  size = 120,
  strokeWidth = 10,
}: {
  percentage1: number;
  percentage2: number;
  size?: number;
  strokeWidth?: number;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex justify-center items-center">
      <svg width={size} height={size}>
        {/* Background circle (complete ring) */}
        <circle
          className="text-gray-300"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* First segment (first percentage) */}
        <circle
          className="text-blue-500"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={`${
            (percentage1 / 100) * circumference
          } ${circumference}`}
          strokeDashoffset="0"
          // Rotate to start from top (12 o'clock)
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        {/* Second segment (second percentage) */}
        <circle
          className="text-red-500"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={`${
            (percentage2 / 100) * circumference
          } ${circumference}`}
          strokeDashoffset="0"
          // Rotate so that it begins where the first segment ends
          transform={`rotate(${(percentage1 / 100) * 360 - 90} ${size / 2} ${
            size / 2
          })`}
        />
      </svg>
    </div>
  );
};

export const QuestionPage = () => {
  const params = useParams() as { questionId: string };
  const dispatch = useAppDispatch();
  const { selectedQuestion, isLoading: isLoadingQuestions } = useAppSelector(
    (state) => state.questions
  );
  const { user: authUser } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchQuestionById(params.questionId));

    return () => {
      dispatch(unselectQuestion());
    };
  }, []);

  const saveAnswer = async (answer: "optionOne" | "optionTwo") => {
    if (!authUser || !selectedQuestion) return;
    await _saveQuestionAnswer({
      authedUser: authUser.id,
      qid: selectedQuestion.question.id,
      answer,
    });
    const users = await _getUsers();
    dispatch(login(users[authUser.id as keyof typeof users] as User));

    await dispatch(fetchQuestionById(params.questionId));
  };

  if (isLoadingQuestions || !selectedQuestion) {
    return <section>Loading...</section>;
  }

  const { author, question } = selectedQuestion;

  const hasVoted = !!authUser?.answers[selectedQuestion.question.id];

  const totalVotes =
    question.optionOne.votes.length + question.optionTwo.votes.length > 0
      ? question.optionOne.votes.length + question.optionTwo.votes.length
      : 1;

  return (
    <section className="space-y-8">
      <h1 className="text-xl font-bold text-center">Poll by {author?.name}</h1>
      {author?.avatarURL && (
        <img
          src={author?.avatarURL}
          alt={author?.name}
          className="w-16 h-16 rounded-full mx-auto"
        />
      )}
      <h2 className="text-xl font-bold text-center">Would you rather</h2>
      {hasVoted && (
        <p className="text-center text-lg font-semibold">
          You have voted for{" "}
          {OPTIONS[authUser?.answers[selectedQuestion.question.id]]}
        </p>
      )}
      <div className="flex items-center gap-4 justify-center">
        <div>
          <p className="p-2 border border-neutral-300">
            {question?.optionOne.text}
          </p>
          <button
            className={`bg-green-600 hover:bg-green-700 w-full block text-white font-bold cursor-pointer disabled:bg-neutral-400 disabled:cursor-auto ${
              authUser?.answers[selectedQuestion.question.id] === "optionOne"
                ? "bg-blue-500!"
                : ""
            }`}
            onClick={() => saveAnswer("optionOne")}
            disabled={hasVoted}
          >
            Click
          </button>
        </div>
        <div>
          <p className="p-2 border border-neutral-300">
            {question?.optionTwo.text}
          </p>
          <button
            className={`bg-green-600 hover:bg-green-700 w-full block text-white font-bold cursor-pointer disabled:bg-neutral-400 disabled:cursor-auto ${
              authUser?.answers[selectedQuestion.question.id] === "optionTwo"
                ? "bg-blue-500!"
                : ""
            }`}
            onClick={() => saveAnswer("optionTwo")}
            disabled={hasVoted}
          >
            Click
          </button>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-lg font-semibold" data-testid="total-option-one">
            Option One has: {question?.optionOne.votes.length} votes (
            {((question?.optionOne.votes.length / totalVotes) * 100).toFixed(2)}
            % )
          </p>
        </div>
        <div>
          <p className="text-lg font-semibold" data-testid="total-option-two">
            Option Two has: {question?.optionTwo.votes.length} votes (
            {((question?.optionTwo.votes.length / totalVotes) * 100).toFixed(2)}
            % )
          </p>
        </div>
      </div>
      <div>
        {totalVotes > 0 && (
          <div className="flex gap-4 items-center">
            <div className="space-y-2">
              <div>
                <div className="bg-blue-500 w-4 h-4" /> <p>Option One</p>
              </div>
              <div>
                <div className="bg-red-500 w-4 h-4" /> <p>Option Two</p>
              </div>
            </div>
            <DonutChart
              percentage1={(question.optionOne.votes.length / totalVotes) * 100}
              percentage2={(question.optionTwo.votes.length / totalVotes) * 100}
            />
          </div>
        )}
      </div>
    </section>
  );
};
