import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Router } from "./router";
import "./index.css";
import { Provider } from "react-redux";
import { setupStore } from "./store";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <StrictMode>
    <Provider store={setupStore()}>
      <Router />
    </Provider>
  </StrictMode>
);
