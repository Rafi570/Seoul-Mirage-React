import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import About from "../components/About";
import ProductsDetails from "../pages/ProductsDetails";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import OrderHistory from "../pages/OrderHistory";
import PrivateRoute from "./PrivateRoute";
import ProcessPay from "../pages/ProcessPay";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/product/:id",
        Component: ProductsDetails,
      },
      {
        path:"/login",
        Component: Login
      },
      {
        path:"/register",
        Component: Register
      },
      {
        path:"/orders",
        element: <PrivateRoute><OrderHistory></OrderHistory></PrivateRoute>
      },
      {
        path: "process-pay",
        element: <PrivateRoute><ProcessPay></ProcessPay></PrivateRoute>
      }
    ],
  },
]);
