import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Item } from "../../App";
import "./List.css";

const CROSSED_STORAGE_KEY = "super-simple-list:crossed-items";

export default function List({ items, onClearAll, onRemoveItem, onUpdateItemQuantity }: ListProps) {
  const navigate = useNavigate();
  const [crossed, setCrossed] = useState<Record<string, boolean>>({});
  const [editMode, setEditMode] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CROSSED_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, boolean>;
        if (parsed && typeof parsed === "object") {
          setCrossed(parsed);
        }
      }
    } catch {
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(CROSSED_STORAGE_KEY, JSON.stringify(crossed));
    } catch {
    }
  }, [crossed, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    const ids = new Set(items.map((i) => i._id));
    setCrossed((prev) => {
      const next: Record<string, boolean> = {};
      for (const [id, value] of Object.entries(prev)) {
        if (value && ids.has(id)) next[id] = true;
      }
      return next;
    });
  }, [items, hydrated]);

  function toggleItem(key: string) {
    setCrossed((prev) => {
      const next = { ...prev };
      if (next[key]) {
        delete next[key];
      } else {
        next[key] = true;
      }
      return next;
    });
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
