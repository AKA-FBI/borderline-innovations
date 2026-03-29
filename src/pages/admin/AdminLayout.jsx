import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import api from "../../api";

const COLORS = {
  navy: "#07103d",
  darkTeal: "#0d4982",
  royalBlue: "#4169e1",
  accent: "#fa2f07",
  white: "#ffffff",
};

const menuItems = [
  { label: "Dashboard", path: "/admin", icon: "📊" },
  { label: "Enquiries", path: "/admin/enquiries", icon: "📩" },
  { label: "Courses", path: "/admin/courses", icon: "🎓" },
  { label: "Events", path: "/admin/events", icon: "📅" },
  { label: "Blog Posts", path: "/admin/blog", icon: "📝" },
  { label: "Subscribers", path: "/admin/subscribers", icon: "📧" },
];

export default function AdminLayout() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) { setLoading(false); navigate("/admin/login"); return; }
    api.getAuth("/auth/me", token)
      .then((data) => { setAdmin(data.admin); setLoading(false); })
      .catch(() => { localStorage.removeItem("admin_token"); setLoading(false); navigate("/admin/login"); });
  }, []);

  useEffect(() => { setSidebarOpen(false); }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f1f5f9", fontFamily: "'DM Sans', sans-serif" }}>
      <p style={{ color: "#8898aa", fontSize: 16 }}>Loading...</p>
    </div>
  );

  if (!admin) return null;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", display: "flex", minHeight: "100vh", background: "#f1f5f9" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        #root { max-width: none !important; width: 100% !important; margin: 0 !important; padding: 0 !important; text-align: left !important; }
        .admin-sidebar {
          width: 260px; background: ${COLORS.navy}; color: white; padding: 0;
          display: flex; flex-direction: column; position: fixed; top: 0; bottom: 0; left: 0; z-index: 100;
          transition: transform 0.3s;
        }
        .admin-main { margin-left: 260px; flex: 1; min-height: 100vh; }
        .admin-topbar {
          background: white; padding: 16px 32px; display: flex; align-items: center;
          justify-content: space-between; border-bottom: 1px solid #e8ecf2;
          position: sticky; top: 0; z-index: 50;
        }
        .admin-content { padding: 32px; }
        .admin-card {
          background: white; border-radius: 12px; padding: 24px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06); border: 1px solid #e8ecf2;
        }
        .admin-table { width: 100%; border-collapse: collapse; }
        .admin-table th {
          text-align: left; padding: 12px 16px; font-size: 12px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 1px; color: #8898aa;
          border-bottom: 2px solid #e8ecf2; background: #fafbfc;
        }
        .admin-table td {
          padding: 14px 16px; font-size: 14px; color: #333;
          border-bottom: 1px solid #f0f0f0; vertical-align: middle;
        }
        .admin-table tr:hover td { background: #fafbfc; }
        .admin-btn {
          padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 600;
          cursor: pointer; border: none; font-family: 'DM Sans', sans-serif; transition: all 0.2s;
        }
        .admin-btn-primary { background: ${COLORS.royalBlue}; color: white; }
        .admin-btn-primary:hover { background: #3558c8; }
        .admin-btn-danger { background: #ef4444; color: white; }
        .admin-btn-danger:hover { background: #dc2626; }
        .admin-btn-outline { background: white; color: ${COLORS.navy}; border: 1.5px solid #d1d9e6; }
        .admin-btn-outline:hover { border-color: ${COLORS.royalBlue}; color: ${COLORS.royalBlue}; }
        .admin-input {
          width: 100%; padding: 10px 14px; border: 1.5px solid #d1d9e6; border-radius: 8px;
          font-size: 14px; font-family: 'DM Sans', sans-serif; outline: none; transition: border 0.2s;
        }
        .admin-input:focus { border-color: ${COLORS.royalBlue}; }
        .admin-select {
          padding: 10px 14px; border: 1.5px solid #d1d9e6; border-radius: 8px;
          font-size: 14px; font-family: 'DM Sans', sans-serif; outline: none; background: white;
        }
        .admin-label { font-size: 13px; font-weight: 600; color: ${COLORS.navy}; margin-bottom: 6px; display: block; }
        .status-badge {
          display: inline-block; padding: 4px 10px; border-radius: 12px;
          font-size: 11px; font-weight: 700; text-transform: uppercase;
        }
        .mobile-menu-btn { display: none; background: none; border: none; font-size: 24px; cursor: pointer; }
        @media (max-width: 768px) {
          .admin-sidebar { transform: translateX(-100%); }
          .admin-sidebar.open { transform: translateX(0); }
          .admin-main { margin-left: 0 !important; }
          .admin-content { padding: 20px 16px !important; }
          .admin-topbar { padding: 12px 16px !important; }
          .mobile-menu-btn { display: block !important; }
          .sidebar-overlay {
            position: fixed; inset: 0; background: rgba(0,0,0,0.5);
            z-index: 99; display: block;
          }
          .admin-table { font-size: 12px; }
          .admin-table th, .admin-table td { padding: 10px 8px; }
        }
      `}</style>

      {/* Sidebar */}
      <aside className={`admin-sidebar${sidebarOpen ? " open" : ""}`}>
        <div style={{ padding: "24px 20px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: "white" }}>Borderline</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: 1.5, textTransform: "uppercase" }}>Admin Panel</div>
          </Link>
        </div>
        <nav style={{ flex: 1, padding: "16px 0" }}>
          {menuItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "12px 24px",
                color: active ? "white" : "rgba(255,255,255,0.6)", textDecoration: "none",
                fontSize: 14, fontWeight: active ? 600 : 400,
                background: active ? "rgba(255,255,255,0.1)" : "transparent",
                borderLeft: active ? `3px solid ${COLORS.accent}` : "3px solid transparent",
                transition: "all 0.2s",
              }}>
                <span style={{ fontSize: 18 }}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <Link to="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
            ← Back to Website
          </Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} style={{ display: "none" }} />}

      {/* Main content */}
      <div className="admin-main">
        <div className="admin-topbar">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button className="mobile-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)} style={{ display: "none" }}>☰</button>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: COLORS.navy }}>
              {menuItems.find((m) => m.path === location.pathname)?.label || "Admin"}
            </h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 14, color: "#5a6577" }}>{admin.email}</span>
            <button className="admin-btn admin-btn-outline" onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}