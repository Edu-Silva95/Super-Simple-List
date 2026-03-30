const API_BASE = import.meta.env.VITE_API_URL ?? "/api";
const API_URL = `${API_BASE}/items`;

async function parseJsonOrThrow(response: Response) {
  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");

  if (!response.ok) {
    let details = response.statusText;
    try {
      details = isJson ? JSON.stringify(await response.json()) : await response.text();
    } catch {
    }

    const suffix = details ? `: ${details}` : "";
    throw new Error(`Request failed (${response.status})${suffix}`);
  }

  if (!isJson) {
    const text = await response.text().catch(() => "");
    throw new Error(
      `Expected JSON but received ${contentType || "unknown content-type"}. ${text.slice(0, 120)}`,
    );
  }

  return response.json();
}

export const itemsAPI = {
  async getItems() {
    const response = await fetch(API_URL);
    return parseJsonOrThrow(response);
  },

  async addItem(item: { name: string; quantity: number; category: string }) {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    return parseJsonOrThrow(response);
  },

  async deleteItem(id: string) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    return parseJsonOrThrow(response);
  },

  async deleteAllItems() {
    const response = await fetch(API_URL, {
      method: "DELETE",
    });
    return parseJsonOrThrow(response);
  },

  async updateItemQuantity(id: string, quantity: number) {
    const response = await fetch(`${API_URL}/${id}` as string, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });
    return parseJsonOrThrow(response);
  },
};
