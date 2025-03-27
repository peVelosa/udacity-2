export type User = {
  id: string;
  password: string;
  name: string;
  avatarURL: string | null;
  answers: Record<string, "optionOne" | "optionTwo">;
  questions: string[];
};

export type Question = {
  id: string;
  author: string;
  timestamp: 1467166872634;
  optionOne: {
    votes: string[];
    text: string;
  };
  optionTwo: {
    votes: string[];
    text: string;
  };
};
