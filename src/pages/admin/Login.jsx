import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const COLORS = { navy: "#07103d", royalBlue: "#4169e1", accent: "#fa2f07" };

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api.post("/auth/login", { email, password });
      localStorage.setItem("admin_token", data.token);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: `linear-gradient(135deg, ${COLORS.navy} 0%, #0d4982 100%)`,
      fontFamily: "'DM Sans', sans-serif", padding: 20,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        #root { max-width: none !important; width: 100% !important; margin: 0 !important; padding: 0 !important; }
      `}</style>
      <div style={{
        background: "white", borderRadius: 16, padding: "48px 40px", width: "100%", maxWidth: 420,
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.navy, marginBottom: 4 }}>Borderline Innovations</div>
          <div style={{ fontSize: 12, color: "#8898aa", letterSpacing: 1.5, textTransform: "uppercase" }}>Admin Panel</div>
        </div>
        {error && (
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8, padding: "10px 14px", color: "#dc2626", fontSize: 13, marginBottom: 20 }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy, display: "block", marginBottom: 6 }}>Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@borderlineinnovations.com"
              style={{ width: "100%", padding: "12px 16px", border: "1.5px solid #d1d9e6", borderRadius: 8, fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none" }} />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy, display: "block", marginBottom: 6 }}>Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{ width: "100%", padding: "12px 16px", border: "1.5px solid #d1d9e6", borderRadius: 8, fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none" }} />
          </div>
          <button type="submit" disabled={loading} style={{
            background: COLORS.royalBlue, color: "white", border: "none", padding: "14px", borderRadius: 8,
            fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
            opacity: loading ? 0.7 : 1, marginTop: 4,
          }}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}