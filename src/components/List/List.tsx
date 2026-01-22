import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./List.css";
import type { Item } from "../../App";

export default function List({ items, onClearAll }: ListProps) {
  const navigate = useNavigate();
  const [crossed, setCrossed] = useState<Record<string, boolean>>({});

  function toggleItem(key: string) {
    setCrossed((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  const grouped = items.reduce(
    (acc, item) => {
      const key = item.category || "Uncategorized";
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    },
    {} as Record<string, typeof items>,
  );

  const categories = Object.keys(grouped).sort();

  return (
    <>
      <button onClick={() => navigate(-1)} className="list-back">
        Back
      </button>
      <div className="card">
        <h1 className="list-title">Your Shopping List</h1>
        <div className="list-actions">
          <button
            className="list-delete"
            onClick={onClearAll}
            disabled={items.length === 0}
          >
            Delete All
          </button>
        </div>

        {items.length === 0 ? (
          <p>Your list is empty.</p>
        ) : (
          <div className="categories">
            {categories.map((cat) => (
              <section key={cat} className="category-section">
                <h2 className="category-title">
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}:
                </h2>
                <ul className="list">
                  {grouped[cat].map((item) => {
                    const key = item._id;
                    return (
                      <li
                        key={key}
                        className={`list-item ${crossed[key] ? "crossed" : ""}`}
                        onClick={() => {
                          toggleItem(key);
                        }}
                      >
                        <span>
                          {item.name} – {item.quantity}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

interface ListProps {
  items: Item[];
  onClearAll?: () => void;
}
