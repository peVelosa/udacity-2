import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Router } from "./router";
import "./index.css";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <StrictMode>
    <Router />
  </StrictMode>
);
