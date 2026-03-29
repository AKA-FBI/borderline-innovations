const API_BASE = "https://borderline-api-pvz0.onrender.com/api";

export const api = {
  // Public GET
  async get(endpoint) {
    const res = await fetch(`${API_BASE}${endpoint}`);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
  },

  // Public POST
  async post(endpoint, data) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || `API error: ${res.status}`);
    return json;
  },

  // Authenticated GET
  async getAuth(endpoint, token) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
  },

  // Authenticated POST
  async postAuth(endpoint, data, token) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || `API error: ${res.status}`);
    return json;
  },

  // Authenticated PUT
  async putAuth(endpoint, data, token) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || `API error: ${res.status}`);
    return json;
  },

  // Authenticated DELETE
  async deleteAuth(endpoint, token) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || `API error: ${res.status}`);
    return json;
  },
};

export default api;