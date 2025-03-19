import { BrowserRouter, Routes, Route } from "react-router";
import { LoginPage } from "./features/login";
import { HomePage } from "./features/(protected)/home";
import { NewPage } from "./features/(protected)/new";
import { LeaderBoardPage } from "./features/(protected)/leaderboard";
import { PoolPage } from "./features/(protected)/pool";

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route>
        <Route path="/" index element={<HomePage />} />
        <Route path="/new" element={<NewPage />} />
        <Route path="/leaderboard" element={<LeaderBoardPage />} />
        <Route path="/pool/:poolId" element={<PoolPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
