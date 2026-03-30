import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ListForm.css";
import type { Item } from "../../App";

interface ListFormProps {
  items: Item[];
  onAddItem: (item: Omit<Item, "_id">) => Promise<boolean> | boolean;
  onRemoveItem: (id: string) => void;
}

export default function ListForm({ items, onAddItem, onRemoveItem }: ListFormProps) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [category, setCategory] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [shake, setShake] = useState(false);

  function handleClick() {
    navigate("/list");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const invalid = !name.trim() || !category.trim() || !quantity || Number(quantity) <= 0;
    if (invalid) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    const ok = await onAddItem({
      name: name.trim(),
      quantity: Number(quantity),
      category: category.trim(),
    });
    if (ok) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
    setName("");
    setQuantity("");
    setCategory("");
  };

  return (
    <>
    <button onClick={() => navigate(-1)} className="form-back">
          Back
        </button>
      <div className={`card ${shake ? "shake" : ""}`}>
        <h1 className="list-title">Add Your Product Here!</h1>
        <form noValidate onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product Name"
            className="input"
            required
          />
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="Quantity"
            className="input"
            min={1}
            required
          />
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            className="input"
            required
          />
          <button type="submit" className="add-btn">Add</button>
        </form>
        <div className="form-actions">
          <button type="button" className="preview-btn" onClick={() => setShowPreview(true)}>
            Preview List
          </button>
          <button type="button" onClick={handleClick} className="show-list-btn">Show List</button>
        </div>
        {showPreview && (
          <div className="modal-overlay" onClick={() => setShowPreview(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>List Preview</h2>
                <button
                  className="modal-close"
                  onClick={() => setShowPreview(false)}
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                {items.length === 0 ? (
                  <p>No items yet.</p>
                ) : (
                  <ul className="modal-list">
                    {items.map((item) => (
                      <li key={item._id} className="modal-item">
                        <div>
                          <strong>{item.name}</strong>
                          <span className="modal-meta">
                            {" "}— {item.quantity} ({item.category})
                          </span>
                        </div>
                        <button
                          type="button"
                          className="remove-btn modal-remove"
                          onClick={() => onRemoveItem(item._id)}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {showToast && <div className="toast">Added to the List!</div>}
    </>
  );
}