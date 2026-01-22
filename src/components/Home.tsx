import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/newlist");
  }

  return (
    <div>
      <h1>Welcome to Super Simple List!</h1>
      <p>Your go-to app for managing simple lists efficiently.</p>
      <button onClick={handleClick}>Start New List</button>
    </div>
  );
}