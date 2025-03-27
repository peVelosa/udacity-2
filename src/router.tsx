import { BrowserRouter, Routes, Route } from "react-router";
import { LoginPage } from "./features/login";
import { HomePage } from "./features/(protected)/features/home";
import { NewPage } from "./features/(protected)/features/new";
import { LeaderBoardPage } from "./features/(protected)/features/leaderboard";
import { QuestionPage } from "./features/(protected)/features/question";
import { RootLayout } from "./layouts/root";
import { AuthLayout } from "./layouts/auth";
import { ProtectedLayout } from "./layouts/protected";

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<RootLayout />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route>
          <Route element={<ProtectedLayout />}>
            <Route path="/" index element={<HomePage />} />
            <Route path="/new" element={<NewPage />} />
            <Route path="/leaderboard" element={<LeaderBoardPage />} />
            <Route path="/question/:questionId" element={<QuestionPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
