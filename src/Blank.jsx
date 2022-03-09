import { useAuth } from "./context/AuthContext";
export default function Blank() {
  const { handleLogout } = useAuth();
  const user = JSON.parse(localStorage.getItem("user")) || null;
  console.log(user.id);
  return (
    <div>
      {user !== null && <h1>{user.username}</h1>}
      <h1>Hello World!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
