import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api";

const COLORS = { navy: "#07103d", royalBlue: "#4169e1", accent: "#fa2f07" };

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    api.getAuth("/dashboard", token)
      .then((data) => { setStats(data.stats); setRecent(data.recentEnquiries); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ color: "#8898aa" }}>Loading dashboard...</p>;

  const cards = [
    { label: "New Enquiries", value: stats?.enquiries?.new || 0, total: stats?.enquiries?.total || 0, icon: "📩", color: "#ef4444", link: "/admin/enquiries" },
    { label: "Active Courses", value: stats?.courses?.active || 0, total: stats?.courses?.total || 0, icon: "🎓", color: COLORS.royalBlue, link: "/admin/courses" },
    { label: "Upcoming Events", value: stats?.events?.upcoming || 0, total: stats?.events?.total || 0, icon: "📅", color: "#16a34a", link: "/admin/events" },
    { label: "Published Posts", value: stats?.blog?.published || 0, total: stats?.blog?.total || 0, icon: "📝", color: "#9333ea", link: "/admin/blog" },
    { label: "Active Subscribers", value: stats?.subscribers?.active || 0, total: stats?.subscribers?.total || 0, icon: "📧", color: "#ca8a04", link: "/admin/subscribers" },
  ];

  const statusColors = { new: "#ef4444", contacted: "#f59e0b", "in-progress": COLORS.royalBlue, closed: "#16a34a" };

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginBottom: 32 }}>
        {cards.map((c) => (
          <Link to={c.link} key={c.label} style={{ textDecoration: "none" }}>
            <div className="admin-card" style={{ display: "flex", alignItems: "center", gap: 16, cursor: "pointer", transition: "box-shadow 0.2s" }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)"}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)"}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: `${c.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{c.icon}</div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.navy }}>{c.value}</div>
                <div style={{ fontSize: 12, color: "#8898aa" }}>{c.label}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="admin-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy }}>Recent Enquiries</h3>
          <Link to="/admin/enquiries" style={{ color: COLORS.royalBlue, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>View All →</Link>
        </div>
        {recent.length === 0 ? (
          <p style={{ color: "#8898aa", fontSize: 14 }}>No enquiries yet.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Destination</th>
                  <th>Level</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((e) => (
                  <tr key={e._id}>
                    <td style={{ fontWeight: 600 }}>{e.name}</td>
                    <td>{e.email}</td>
                    <td>{e.country || "—"}</td>
                    <td>{e.level || "—"}</td>
                    <td>
                      <span className="status-badge" style={{ background: `${statusColors[e.status] || "#999"}20`, color: statusColors[e.status] || "#999" }}>
                        {e.status}
                      </span>
                    </td>
                    <td style={{ fontSize: 13, color: "#8898aa" }}>{new Date(e.createdAt).toLocaleDateString()}</td>
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