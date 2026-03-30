import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./List.css";
import type { Item } from "../../App";

export default function List({ items, onClearAll, onRemoveItem, onUpdateItemQuantity }: ListProps) {
  const navigate = useNavigate();
  const [crossed, setCrossed] = useState<Record<string, boolean>>({});
  const [editMode, setEditMode] = useState(false);

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

          <button
            className="list-update"
            onClick={() => {
              setEditMode((prev) => !prev);
            }}
            disabled={items.length === 0}
          >
            Update
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
                        <div className="item-row">
                          <span className="item-text">
                            {item.name} – {item.quantity}
                          </span>

                          {editMode && (
                            <div className="item-controls" onClick={(e) => e.stopPropagation()}>
                              <button
                                type="button"
                                className="item-control item-control-up"
                                aria-label={`Increase quantity for ${item.name}`}
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  await onUpdateItemQuantity(item._id, item.quantity + 1);
                                }}
                              >
                                ▲
                              </button>
                              <button
                                type="button"
                                className="item-control item-control-down"
                                aria-label={`Decrease quantity for ${item.name}`}
                                disabled={item.quantity <= 1}
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  await onUpdateItemQuantity(item._id, item.quantity - 1);
                                }}
                              >
                                ▼
                              </button>
                              <button
                                type="button"
                                className="item-control item-control-remove"
                                aria-label={`Remove ${item.name}`}
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  await onRemoveItem(item._id);
                                  setCrossed((prev) => {
                                    const next = { ...prev };
                                    delete next[item._id];
                                    return next;
                                  });
                                }}
                              >
                                ✕
                              </button>
                            </div>
                          )}
                        </div>
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
  onRemoveItem: (id: string) => Promise<void> | void;
  onUpdateItemQuantity: (id: string, quantity: number) => Promise<void> | void;
}
