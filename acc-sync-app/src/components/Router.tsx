import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../components/LoginPage";
import UserDashboard from "../components/UserDashboard";
import AdminDashboard from "../components/AdminDashboard";
import Roles from "./Roles";
import Accesses from "./Accesses";
import Users from "./Users";
import Apps from "./Apps";

export const Router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage/>,
    },
    {
      path: "/user-dashboard",
      element: <UserDashboard/>,
    },
    {
      path: "/admin-dashboard",
      element: <AdminDashboard/>,
    },
    {
      path: "/roles",
      element: <Roles/>,
    },
    {
        path: "/accesses",
        element: <Accesses/>,
      },
      {
        path: "/users",
        element: <Users/>,
      },
      {
        path: "/apps",
        element: <Apps/>,
      },
  
  ]);
  