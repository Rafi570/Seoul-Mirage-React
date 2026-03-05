import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import About from "../components/About";
import ProductsDetails from "../pages/ProductsDetails";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
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
      }
    ],
  },
]);
