import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Home from "@/page/Home";
import CategoryPage from "@/page/CategoryPage";
import ProductDetails from "@/page/ProductDetails";

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
      {
        path: "/category/:category",
        element: <CategoryPage />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
    ],
  },
]);

export default router;
