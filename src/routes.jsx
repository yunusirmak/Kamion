import { Navigate, useRoutes } from "react-router-dom";
//
import Blank from "./Blank";
import HomePage from "./pages/HomePage";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/dashboard",
      element: <Blank />,
      children: [
        { path: "yunus", element: <Blank /> },
        { path: "app", element: <HomePage /> },
      ],
    },
    {
      path: "/",
      element: <HomePage />,
      children: [
        { path: "/", element: <Navigate to="/dashboard/app" /> },
        { path: "login", element: <HomePage /> },
        { path: "register", element: <HomePage /> },
        { path: "404", element: <Blank /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
