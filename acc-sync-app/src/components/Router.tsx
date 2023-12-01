import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../components/LoginPage";
import Roles from './Roles';
import Accesses from "./Accesses";
import Users from "./Users";
import Apps from "./Apps";
import Audits from "./Audits";

export const Router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage/>,
    },
    {
      path: "/audits",
      element: <Audits/>,
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
  