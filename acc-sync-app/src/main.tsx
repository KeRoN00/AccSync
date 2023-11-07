import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/LoginPage.tsx';
import AdminDashboard from './pages/admin/AdminDashboard.tsx';
import UserDashboard from './pages/user/UserDashboard.tsx';

const router = createBrowserRouter([
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
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
