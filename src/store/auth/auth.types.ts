import { User } from "@/@types";

export type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
};
