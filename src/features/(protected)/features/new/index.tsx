import { Input } from "@/components/input";
import { _saveQuestion } from "@/server/_DATA";
import { useAppSelector } from "@/store/hooks";
import { useState } from "react";
import { useNavigate } from "react-router";

export const NewPage = () => {
  const [questionOptions, setQuestionOptions] = useState({
    first: "",
    second: "",
  });

  const navigate = useNavigate();

  const { user } = useAppSelector((store) => store.auth);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user || !questionOptions.first || !questionOptions.second) return;

    await _saveQuestion({
      optionOneText: questionOptions.first,
      optionTwoText: questionOptions.second,
      author: user.id,
    });

    navigate("/");
  };

  return (
    <section>
      <h1 className="text-lg text-center font-bold">Would You Rather</h1>
      <p className="text-neutral-400 text-center mb-8">Create Your Own Poll</p>
      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          name="first-option"
          id="first-option"
          value={questionOptions.first}
          onChange={(e) =>
            setQuestionOptions((old) => ({ ...old, first: e.target.value }))
          }
          label={"First Option"}
          placeholder="Option one"
        />
        <Input
          name="second-option"
          id="second-option"
          value={questionOptions.second}
          onChange={(e) =>
            setQuestionOptions((old) => ({ ...old, second: e.target.value }))
          }
          label={"Second Option"}
          placeholder="Option two"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-neutral-900 w-fit text-white font-bold rounded-md mx-auto disabled:bg-neutral-500 block"
          disabled={!questionOptions.first || !questionOptions.second}
        >
          Submit
        </button>
      </form>
    </section>
  );
};
