import { Question, User } from "@/@types";

export type PoolState = {
  questions: Question[];
  isLoading: boolean;
  error: string | null;
  selectedQuestion: {
    question: Question;
    author: Required<User>;
  } | null;
};
