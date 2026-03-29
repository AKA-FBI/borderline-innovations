import { useState, useEffect } from "react";
import api from "../../api";

const COLORS = { navy: "#07103d", royalBlue: "#4169e1" };

export default function Subscribers() {
  const [subscribers, setSubscribers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("true"); // "true" = active
  const token = localStorage.getItem("admin_token");

  useEffect(() => { fetchSubscribers(); }, [filter]);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const q = filter ? `?active=${filter}` : "";
      const data = await api.getAuth(`/newsletter/subscribers${q}`, token);
      setSubscribers(data.subscribers);
      setTotal(data.total);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  return (
    <>
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 8 }}>
          <button className={`admin-btn ${filter === "" ? "admin-btn-primary" : "admin-btn-outline"}`} onClick={() => setFilter("")}>All</button>
          <button className={`admin-btn ${filter === "true" ? "admin-btn-primary" : "admin-btn-outline"}`} onClick={() => setFilter("true")}>Active</button>
          <button className={`admin-btn ${filter === "false" ? "admin-btn-primary" : "admin-btn-outline"}`} onClick={() => setFilter("false")}>Unsubscribed</button>
        </div>
        <p style={{ color: "#5a6577", fontSize: 14 }}>{total} subscribers</p>
      </div>

      <div className="admin-card" style={{ padding: 0 }}>
        {loading ? <p style={{ padding: 24, color: "#8898aa" }}>Loading...</p> : subscribers.length === 0 ? (
          <p style={{ padding: 24, color: "#8898aa" }}>No subscribers found.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr><th>Email</th><th>Source</th><th>Status</th><th>Subscribed</th></tr>
              </thead>
              <tbody>
                {subscribers.map((s) => (
                  <tr key={s._id}>
                    <td style={{ fontWeight: 600 }}>{s.email}</td>
                    <td style={{ fontSize: 13 }}>{s.source}</td>
                    <td>
                      <span className="status-badge" style={{
                        background: s.isActive ? "#f0fdf4" : "#fef2f2",
                        color: s.isActive ? "#16a34a" : "#ef4444",
                      }}>
                        {s.isActive ? "Active" : "Unsubscribed"}
                      </span>
                    </td>
                    <td style={{ fontSize: 13, color: "#8898aa" }}>{new Date(s.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}