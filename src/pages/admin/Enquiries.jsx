import { useState, useEffect } from "react";
import api from "../../api";

const COLORS = { navy: "#07103d", royalBlue: "#4169e1", accent: "#fa2f07" };
const statusColors = { new: "#ef4444", contacted: "#f59e0b", "in-progress": COLORS.royalBlue, closed: "#16a34a" };
const statuses = ["new", "contacted", "in-progress", "closed"];

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState(null);
  const token = localStorage.getItem("admin_token");

  useEffect(() => { fetchEnquiries(); }, [filter]);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const q = filter ? `?status=${filter}` : "";
      const data = await api.getAuth(`/enquiries${q}`, token);
      setEnquiries(data.enquiries);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.putAuth(`/enquiries/${id}`, { status }, token);
      fetchEnquiries();
      if (selected?._id === id) setSelected({ ...selected, status });
    } catch (err) { console.error(err); }
  };

  const deleteEnquiry = async (id) => {
    if (!window.confirm("Delete this enquiry?")) return;
    try {
      await api.deleteAuth(`/enquiries/${id}`, token);
      fetchEnquiries();
      if (selected?._id === id) setSelected(null);
    } catch (err) { console.error(err); }
  };

  return (
    <>
      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        <button className={`admin-btn ${!filter ? "admin-btn-primary" : "admin-btn-outline"}`} onClick={() => setFilter("")}>All</button>
        {statuses.map((s) => (
          <button key={s} className={`admin-btn ${filter === s ? "admin-btn-primary" : "admin-btn-outline"}`} onClick={() => setFilter(s)}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        {/* List */}
        <div style={{ flex: "1 1 500px", minWidth: 0 }}>
          <div className="admin-card" style={{ padding: 0 }}>
            {loading ? <p style={{ padding: 24, color: "#8898aa" }}>Loading...</p> : enquiries.length === 0 ? (
              <p style={{ padding: 24, color: "#8898aa" }}>No enquiries found.</p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table className="admin-table">
                  <thead>
                    <tr><th>Name</th><th>Email</th><th>Status</th><th>Date</th><th>Actions</th></tr>
                  </thead>
                  <tbody>
                    {enquiries.map((e) => (
                      <tr key={e._id} onClick={() => setSelected(e)} style={{ cursor: "pointer", background: selected?._id === e._id ? "#f8fafc" : "transparent" }}>
                        <td style={{ fontWeight: 600 }}>{e.name}</td>
                        <td style={{ fontSize: 13 }}>{e.email}</td>
                        <td>
                          <span className="status-badge" style={{ background: `${statusColors[e.status]}20`, color: statusColors[e.status] }}>{e.status}</span>
                        </td>
                        <td style={{ fontSize: 13, color: "#8898aa" }}>{new Date(e.createdAt).toLocaleDateString()}</td>
                        <td>
                          <button className="admin-btn admin-btn-danger" style={{ padding: "4px 10px", fontSize: 11 }} onClick={(ev) => { ev.stopPropagation(); deleteEnquiry(e._id); }}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Detail panel */}
        {selected && (
          <div style={{ flex: "0 0 360px", minWidth: 280 }}>
            <div className="admin-card">
              <h3 style={{ fontSize: 18, fontWeight: 700, color: COLORS.navy, marginBottom: 20 }}>{selected.name}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, fontSize: 14 }}>
                <div><strong>Email:</strong> {selected.email}</div>
                <div><strong>Phone:</strong> {selected.phone || "—"}</div>
                <div><strong>Destination:</strong> {selected.country || "—"}</div>
                <div><strong>Level:</strong> {selected.level || "—"}</div>
                <div><strong>Message:</strong><br /><span style={{ color: "#5a6577" }}>{selected.message || "No message"}</span></div>
                <div><strong>Submitted:</strong> {new Date(selected.createdAt).toLocaleString()}</div>
              </div>
              <div style={{ marginTop: 20 }}>
                <label className="admin-label">Update Status</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {statuses.map((s) => (
                    <button key={s} className={`admin-btn ${selected.status === s ? "admin-btn-primary" : "admin-btn-outline"}`}
                      style={{ fontSize: 12, padding: "6px 12px" }}
                      onClick={() => updateStatus(selected._id, s)}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <button className="admin-btn admin-btn-outline" style={{ marginTop: 16, width: "100%" }} onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}