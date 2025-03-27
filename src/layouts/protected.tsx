import { useAuth } from "@/hooks/auth";
import { logout } from "@/store/auth/auth.reducer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchQuestions } from "@/store/pool/pool.reducer";
import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router";

export const ProtectedLayout = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const { isAuthenticated } = useAuth();

  const onLogout = () => dispatch(logout());

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  if (!isAuthenticated)
    return (
      <section className="grid place-items-center mt-20 ">
        <h1 className="text-lg font-bold">You are not authenticated</h1>
        <Link
          to={"/login"}
          className="underline text-blue-500 visited:text-blue-600"
        >
          Click here to Login
        </Link>
      </section>
    );

  return (
    <>
      <header className="border-b border-neutral-300">
        <nav className="flex items-center justify-between">
          <ul className="flex gap-4 items-center">
            <li>
              <Link
                to="/"
                className={`py-2 block ${
                  location.pathname === "/" ? "border-b border-neutral-500" : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/leaderboard"
                className={`py-2 block ${
                  location.pathname === "/leaderboard"
                    ? "border-b border-neutral-500"
                    : ""
                }`}
              >
                Leaderboard
              </Link>
            </li>
            <li>
              <Link
                to="/new"
                className={`py-2 block ${
                  location.pathname === "/new"
                    ? "border-b border-neutral-500"
                    : ""
                }`}
              >
                New
              </Link>
            </li>
          </ul>
          <div className="flex items-center gap-4">
            <span
              className={`py-2 flex items-center gap-2 ${
                location.pathname === "/profile"
                  ? "border-b border-neutral-500"
                  : ""
              }`}
            >
              {user?.avatarURL && (
                <img
                  src={user.avatarURL}
                  className="w-8 h-8 rounded-full"
                  alt={user?.name}
                />
              )}
              {user?.name}
            </span>
            <button
              onClick={onLogout}
              className="cursor-pointer hover:font-bold"
            >
              Logout
            </button>
          </div>
        </nav>
      </header>
      <main className="pt-4">
        <Outlet />
      </main>
    </>
  );
};
