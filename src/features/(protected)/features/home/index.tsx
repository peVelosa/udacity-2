import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchQuestions } from "@/store/pool/pool.reducer";
import { useEffect } from "react";
import { Link } from "react-router";

export const HomePage = () => {
  const { questions, isLoading, error } = useAppSelector(
    (state) => state.questions
  );

  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  if (!user) return <h1>Not logged in</h1>;

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>{error}</h1>;

  const newQuestions = questions.filter(
    (question) =>
      new Date().getTime() <
      new Date(question.timestamp).getTime() + 1000 * 60 * 60 * 24
  );
  const doneQuestions = questions.filter(
    (question) => new Date().getTime() > new Date(question.timestamp).getTime()
  );

  const answerQuestion = questions
    .filter((q) => user.answers[q.id] !== undefined)
    .sort((a, b) => b.timestamp - a.timestamp);

  const unansweredQuestions = questions
    .filter((q) => user.answers[q.id] === undefined)
    .sort((a, b) => b.timestamp - a.timestamp);

  return (
    <>
      <section className="border border-neutral-300 py-4 mb-4">
        <h2 className="font-bold text-lg text-center">Answered Questions</h2>
        <div className="border-t border-neutral-300 py-4 px-4 grid grid-cols-3 gap-4">
          {answerQuestion.map((question) => (
            <div
              key={question.id}
              className="border border-neutral-300 p-4 rounded-md text-center space-y-4"
            >
              <p className="font-semibold">{question.author}</p>
              <p className="text-neutral-500">
                {new Intl.DateTimeFormat("en", {
                  hour: "numeric",
                  minute: "numeric",
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                }).format(new Date(question.timestamp))}
              </p>
              <Link
                to={`/question/${question.id}`}
                className="block border border-green-400 rounded-sm w-full py-2 hover:bg-green-200 transition"
              >
                Show
              </Link>
            </div>
          ))}
        </div>
      </section>
      <section className="border border-neutral-300 py-4">
        <h2 className="font-bold text-lg text-center">Unanswered Questions</h2>
        <div className="border-t border-neutral-300 py-4 px-4 grid grid-cols-3 gap-4">
          {unansweredQuestions.map((question) => (
            <div
              key={question.id}
              className="border border-neutral-300 p-4 rounded-md text-center space-y-4"
            >
              <p className="font-semibold">{question.author}</p>
              <p className="text-neutral-500">
                {new Intl.DateTimeFormat("en", {
                  hour: "numeric",
                  minute: "numeric",
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                }).format(new Date(question.timestamp))}
              </p>
              <Link
                to={`/question/${question.id}`}
                className="block border border-green-400 rounded-sm w-full py-2 hover:bg-green-200 transition"
              >
                Show
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
