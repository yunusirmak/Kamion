import { useAuth } from "../context/AuthContext";
import LogoAppBar from "../components/LogoAppBar";
import { Outlet } from "react-router-dom";
export default function Dashboard() {
  const { handleLogout } = useAuth();
  const user = JSON.parse(localStorage.getItem("user")) || null;
  console.log(user.id);
  return (
    <div>
      <LogoAppBar />
      <Outlet />
    </div>
  );
}
