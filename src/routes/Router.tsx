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
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import Products from "../pages/Dashboard/Products";
import Customers from "../pages/Dashboard/Customers";
import Orders from "../pages/Dashboard/Orders";
import Settings from "../pages/Dashboard/Settings";
import UserSettings from "../pages/userSettings";
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
        path: "/login",
        Component: Login,
      },
      {
        path: "/collections",
        Component: Collections,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/orders/success",
        element: (
          <PrivateRoute>
            <PaymentSucsses></PaymentSucsses>
          </PrivateRoute>
        ),
      },
      {
        path: "/settings",
        element: (
          <PrivateRoute>
            <UserSettings></UserSettings>
          </PrivateRoute>
        ),
      },
      {
        path: "/orders/fail",
        element: (
          <PrivateRoute>
            <PaymentFail></PaymentFail>
          </PrivateRoute>
        ),
      },
      {
        path: "/orders",
        element: (
          <PrivateRoute>
            <OrderHistory></OrderHistory>
          </PrivateRoute>
        ),
      },
      {
        path: "process-pay",
        element: (
          <PrivateRoute>
            <ProcessPay></ProcessPay>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome
      },
      {
        path: "products",
        Component: Products
      },
      {
        path: "customers",
        Component:Customers
      },
      {
        path: "orders",
        Component:Orders
      },
      {
        path: "settings",
        Component: Settings
      }
    ],
  },
]);
