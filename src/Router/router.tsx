import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Home from "@/page/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <div className="text-center text-3xl text-red-400">
        Page Not Found 404
      </div>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

export default router;
