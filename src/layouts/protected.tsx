import { useAuth } from "@/hooks/auth";
import { useAppDispatch } from "@/store/hooks";
import { fetchQuestions } from "@/store/pool/pool.reducer";
import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router";

export const ProtectedLayout = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  if (!isAuthenticated)
    return (
      <section className="grid place-items-center mt-20 ">
        <h1 className="text-lg font-bold">You are not authenticated</h1>
        <Link
          to={`/login?redirect=${location.pathname}`}
          className="underline text-blue-500 visited:text-blue-600"
        >
          Click here to Login
        </Link>
      </section>
    );

  return (
    <main className="pt-4">
      <Outlet />
    </main>
  );
};
