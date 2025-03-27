import { User } from "@/@types";

export type UsersState = {
  users: User[];
  error: string | null;
  isLoading: boolean;
};
