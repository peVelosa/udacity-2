import { BrowserRouter, Routes, Route } from "react-router";
import { App } from "./app";

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>
);
