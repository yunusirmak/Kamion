import { Navigate, useRoutes } from "react-router-dom";
//
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";

// ----------------------------------------------------------------------

export default function Router() {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  return useRoutes([
    {
      path: "/dashboard/",
      element: <Dashboard />,
      children: [{ path: "app", element: <Users /> }],
    },
    {
      path: "/",
      element: user !== null ? <Navigate to="/dashboard/app" /> : <HomePage />,
      children: [
        { path: "/", element: <Navigate to="/dashboard/app" /> },
        { path: "*", element: <Navigate to="/" /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
