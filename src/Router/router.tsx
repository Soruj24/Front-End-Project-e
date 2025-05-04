import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Home from "@/page/Home";
import CategoryPage from "@/page/CategoryPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <p className="text-center text-3xl text-red-400">
        Page Not Found 404
      </p>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/category/:category",
        element: <CategoryPage />,
      },
    ],
  },
]);

export default router;
