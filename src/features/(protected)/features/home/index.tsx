import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchQuestions } from "@/store/pool/pool.reducer";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export const HomePage = () => {
  const { questions, isLoading, error } = useAppSelector(
    (state) => state.questions
  );

  const [selectedView, setSelectedView] = useState<"unanswered" | "answered">(
    "unanswered"
  );

  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  if (!user) return <h1>Not logged in</h1>;

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>{error}</h1>;

  const answerQuestion = questions
    .filter((q) => user.answers[q.id] !== undefined)
    .sort((a, b) => b.timestamp - a.timestamp);

  const unansweredQuestions = questions
    .filter((q) => user.answers[q.id] === undefined)
    .sort((a, b) => b.timestamp - a.timestamp);

  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <button
          className={`bg-gray-200 cursor-pointer rounded-sm p-2 hover:bg-gray-400 ${
            selectedView === "answered" ? "bg-gray-400" : ""
          }`}
          onClick={() => setSelectedView("answered")}
        >
          Answered
        </button>
        <button
          className={`bg-gray-200 cursor-pointer rounded-sm p-2 hover:bg-gray-400 ${
            selectedView === "unanswered" ? "bg-gray-400" : ""
          }`}
          onClick={() => setSelectedView("unanswered")}
        >
          Unanswered
        </button>
      </div>
      {selectedView === "answered" && (
        <>
          <section className="border border-neutral-300 py-4 mb-4">
            <h2 className="font-bold text-lg text-center">
              Answered Questions
            </h2>
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
        </>
      )}
      {selectedView === "unanswered" && (
        <>
          <section className="border border-neutral-300 py-4">
            <h2 className="font-bold text-lg text-center">
              Unanswered Questions
            </h2>
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
      )}
    </>
  );
};
