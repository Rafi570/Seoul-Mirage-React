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
import Contact from "../pages/Contact";
import Collections from "../pages/Collections";
import PaymentSucsses from "../pages/PaymentSucsses";
import PaymentFail from "../pages/PaymentFail";
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
        path: "/collections",
        Component: Collections
      },
      {
        path: "contact",
        Component:Contact
      },
      {
        path:"/register",
        Component: Register
      },
      {
        path: "/orders/success",
        element: <PaymentSucsses></PaymentSucsses>
      },
      {
        path: '/orders/fail',
        element:<PaymentFail></PaymentFail>
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
