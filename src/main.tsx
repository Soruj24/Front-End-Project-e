import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="container mx-auto">
      <Provider store={store}>
        <App />
      </Provider>
    </div>
  </StrictMode>
);
