import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/newlist");
  }

  return (
    <div className="home">
      <h1>Welcome to Super Simple List!</h1>
      <p>Your go-to app for managing simple lists efficiently.</p>
      <button onClick={handleClick}>Start New List</button>
    </div>
  );
}