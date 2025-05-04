import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Home from "@/page/Home";
import CategoryPage from "@/page/CategoryPage";
import ProductDetails from "@/page/ProductDetails";
import Cart from "@/page/Cart";
import Checkout from "@/page/Checkout";
import OrderConfirmation from "@/page/OrderConfirmation";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/order-confirmation",
        element: <OrderConfirmation />,
      },
    ],
  },
]);

export default router;
