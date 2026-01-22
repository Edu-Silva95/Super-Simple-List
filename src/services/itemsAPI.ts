const API_URL = "http://localhost:5000/api/items";

export const itemsAPI = {
  async getItems() {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch items");
    return response.json();
  },

  async addItem(item: { name: string; quantity: number; category: string }) {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    if (!response.ok) throw new Error("Failed to add item");
    return response.json();
  },

  async deleteItem(id: string) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete item");
    return response.json();
  },

  async deleteAllItems() {
    const response = await fetch(API_URL, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete all items");
    return response.json();
  },
};
