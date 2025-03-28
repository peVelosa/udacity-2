import { logout } from "@/store/auth/auth.reducer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchQuestions } from "@/store/pool/pool.reducer";
import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";

export const RootLayout = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  return (
    <div className="p-4">
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
          {isAuthenticated && (
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
          )}
        </nav>
      </header>
      <Outlet />
    </div>
  );
};
