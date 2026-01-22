import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <button className="nav-icon" onClick={() => navigate("/")} aria-label="Home">
        🏠
      </button>
      <h1 className="nav-title">Super Simple List</h1>
      <button className="nav-icon" onClick={() => navigate("/list")} aria-label="View List">
        📝
      </button>
    </nav>
  );
}
