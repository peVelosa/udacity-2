import { useAppSelector } from "@/store/hooks";

export const useAuth = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return {
    isAuthenticated,
  };
};
