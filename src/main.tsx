import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { RouterProvider } from "react-router-dom";
import router from "./Router/router.tsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="container mx-auto">
      <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer position="bottom-right" autoClose={3000} />
      </Provider>
    </div>
  </StrictMode>
);
