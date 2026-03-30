import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home.tsx";
import NewList from "./components/List/NewList.tsx";
import ListForm from "./components/List/ListForm.tsx";
import List from "./components/List/List.tsx";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import { itemsAPI } from "./services/itemsAPI.ts";

export interface Item {
  _id: string;
  name: string;
  quantity: number;
  category: string;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await itemsAPI.getItems();
      setItems(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load items");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (item: Omit<Item, "_id">): Promise<boolean> => {
    try {
      const newItem = await itemsAPI.addItem(item);
      setItems((prev) => [...prev, newItem]);
      setError(null);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add item");
      console.error(err);
      return false;
    }
  };

  const handleRemoveItem = async (id: string) => {
    try {
      await itemsAPI.deleteItem(id);
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete item");
      console.error(err);
    }
  };

  const handleUpdateItemQuantity = async (id: string, quantity: number) => {
    try {
      const updatedItem = await itemsAPI.updateItemQuantity(id, quantity);
      setItems((prev) => prev.map((item) => (item._id === id ? updatedItem : item)));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update item");
      console.error(err);
    }
  };

  const handleClearAll = async () => {
    const confirmed = confirm("Are you sure you want to delete all items?");
    if (confirmed) {
      try {
        await itemsAPI.deleteAllItems();
        setItems([]);
        alert("All items have been deleted from your list.");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to clear items");
        console.error(err);
      }
    }
  };

  if (loading) {
    return <div style={{ textAlign: "center", padding: "2rem" }}>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Navbar />
      {error && (
        <div style={{ color: "red", padding: "1rem", textAlign: "center" }}>
          Error: {error}
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newlist" element={<NewList />} />
        <Route
          path="/listform"
          element={
            <ListForm
              items={items}
              onAddItem={handleAddItem}
              onRemoveItem={handleRemoveItem}
            />
          }
        />
        <Route
          path="/list"
          element={
            <List
              items={items}
              onClearAll={handleClearAll}
              onRemoveItem={handleRemoveItem}
              onUpdateItemQuantity={handleUpdateItemQuantity}
            />
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;