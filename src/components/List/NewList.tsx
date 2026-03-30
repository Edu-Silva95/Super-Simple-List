import { useNavigate } from "react-router-dom";
import "./NewList.css";

export default function CreateNewList() {
  const navigate = useNavigate();
 
  function handleClick() {
    navigate("/listform");
  }
 
  return (
    <div className="newlist">
      <h1>Create a New List</h1>
      <p>Start your grocery list by clicking the button bellow. Or click on the top right corner icon to see your created list!</p>
      <button onClick={handleClick} className="NewListBtn">Create List</button>
    </div>
  );
}