import { useState, useEffect } from "react";
import api from "../../api";

const COLORS = { navy: "#07103d", royalBlue: "#4169e1", accent: "#fa2f07" };
const emptyForm = { title: "", description: "", date: "", time: "", location: "", tag: "Free Entry", capacity: "", isActive: true, featured: false };

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const token = localStorage.getItem("admin_token");

  useEffect(() => { fetchEvents(); }, []);

  const fetchEvents = async () => {
    try {
      const data = await api.getAuth("/events/all", token);
      setEvents(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, capacity: form.capacity ? parseInt(form.capacity) : undefined };
      if (editing === "new") {
        await api.postAuth("/events", payload, token);
      } else {
        await api.putAuth(`/events/${editing._id}`, payload, token);
      }
      setEditing(null);
      setForm(emptyForm);
      fetchEvents();
    } catch (err) { alert(err.message); }
    finally { setSaving(false); }
  };

  const deleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    try {
      await api.deleteAuth(`/events/${id}`, token);
      fetchEvents();
    } catch (err) { console.error(err); }
  };

  const startEdit = (ev) => {
    setForm({ title: ev.title, description: ev.description, date: ev.date ? ev.date.split("T")[0] : "", time: ev.time || "", location: ev.location, tag: ev.tag || "Free Entry", capacity: ev.capacity || "", isActive: ev.isActive, featured: ev.featured });
    setEditing(ev);
  };

  if (editing !== null) {
    return (
      <div className="admin-card" style={{ maxWidth: 700 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: COLORS.navy, marginBottom: 24 }}>
          {editing === "new" ? "Add New Event" : "Edit Event"}
        </h3>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label className="admin-label">Event Title *</label>
            <input className="admin-input" name="title" required value={form.title} onChange={handleChange} placeholder="Study Abroad Expo — Lagos" />
          </div>
          <div>
            <label className="admin-label">Description *</label>
            <textarea className="admin-input" name="description" rows={3} required value={form.description} onChange={handleChange} placeholder="Event description..." style={{ resize: "vertical" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label className="admin-label">Date *</label>
              <input className="admin-input" type="date" name="date" required value={form.date} onChange={handleChange} />
            </div>
            <div>
              <label className="admin-label">Time</label>
              <input className="admin-input" name="time" value={form.time} onChange={handleChange} placeholder="10:00 AM — 4:00 PM" />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            <div>
              <label className="admin-label">Location *</label>
              <input className="admin-input" name="location" required value={form.location} onChange={handleChange} placeholder="Eko Hotels, Lagos" />
            </div>
            <div>
              <label className="admin-label">Tag</label>
              <input className="admin-input" name="tag" value={form.tag} onChange={handleChange} placeholder="Free Entry" />
            </div>
            <div>
              <label className="admin-label">Capacity</label>
              <input className="admin-input" type="number" name="capacity" value={form.capacity} onChange={handleChange} placeholder="200" />
            </div>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, cursor: "pointer" }}>
              <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} /> Active
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, cursor: "pointer" }}>
              <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} /> Featured
            </label>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={saving} style={{ padding: "12px 28px" }}>
              {saving ? "Saving..." : editing === "new" ? "Add Event" : "Save Changes"}
            </button>
            <button type="button" className="admin-btn admin-btn-outline" onClick={() => { setEditing(null); setForm(emptyForm); }}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <p style={{ color: "#5a6577", fontSize: 14 }}>{events.length} events total</p>
        <button className="admin-btn admin-btn-primary" onClick={() => { setForm(emptyForm); setEditing("new"); }}>+ Add Event</button>
      </div>
      <div className="admin-card" style={{ padding: 0 }}>
        {loading ? <p style={{ padding: 24, color: "#8898aa" }}>Loading...</p> : (
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr><th>Title</th><th>Date</th><th>Location</th><th>Tag</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {events.map((ev) => (
                  <tr key={ev._id}>
                    <td style={{ fontWeight: 600 }}>{ev.title}</td>
                    <td style={{ fontSize: 13 }}>{new Date(ev.date).toLocaleDateString()}</td>
                    <td style={{ fontSize: 13 }}>{ev.location}</td>
                    <td><span className="status-badge" style={{ background: "#f0f4ff", color: COLORS.royalBlue }}>{ev.tag}</span></td>
                    <td>
                      <span className="status-badge" style={{ background: ev.isActive ? "#f0fdf4" : "#fef2f2", color: ev.isActive ? "#16a34a" : "#ef4444" }}>
                        {ev.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button className="admin-btn admin-btn-outline" style={{ padding: "4px 10px", fontSize: 11 }} onClick={() => startEdit(ev)}>Edit</button>
                        <button className="admin-btn admin-btn-danger" style={{ padding: "4px 10px", fontSize: 11 }} onClick={() => deleteEvent(ev._id)}>Delete</button>
                      </div>
                    </td>
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