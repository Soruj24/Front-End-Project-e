import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { RouterProvider } from "react-router-dom";
import router from "./Router/router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="container mx-auto">
      <Provider store={store}>
      <RouterProvider router={router} />
      </Provider>
    </div>
  </StrictMode>
);
