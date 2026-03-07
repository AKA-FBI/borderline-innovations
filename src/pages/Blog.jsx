import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { COLORS } from "../Layout";
import api from "../api";

const categoryColors = {
  Scholarships: { bg: "#f0f4ff", color: "#4169e1" },
  Tips: { bg: "#f0fdf4", color: "#16a34a" },
  Guides: { bg: "#fef3f2", color: "#fa2f07" },
  Visa: { bg: "#fdf4ff", color: "#9333ea" },
  News: { bg: "#eff6ff", color: "#2563eb" },
  "Student Life": { bg: "#fefce8", color: "#ca8a04" },
};

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("");

  useEffect(() => { fetchPosts(); }, [category]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {};
      if (category) params.category = category;
      const data = await api.get("/blog");
      setPosts(data.posts);
    } catch (err) {
      setError("Failed to load blog posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <>
      <div className="page-header">
        <div className="wave-bg">
          <svg viewBox="0 0 1200 400">
            {[...Array(8)].map((_, i) => (
              <path key={i} d={`M0 ${100 + i * 35} Q300 ${70 + i * 35} 600 ${100 + i * 35} T1200 ${100 + i * 35}`} stroke="white" strokeWidth="0.6" fill="none" />
            ))}
          </svg>
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>&rsaquo;</span> <span style={{ color: "rgba(255,255,255,0.9)" }}>Blog</span>
          </div>
          <h1>Blog & Resources</h1>
          <p>Expert advice, guides, and insights to help you navigate your study abroad journey.</p>
        </div>
      </div>

      <section className="section-padding" style={{ padding: "60px 40px", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 40, flexWrap: "wrap" }}>
            {["", "Scholarships", "Tips", "Guides", "Visa", "News", "Student Life"].map((cat) => (
              <button key={cat} onClick={() => setCategory(cat)} style={{
                padding: "8px 18px", borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: "pointer",
                border: category === cat ? "none" : "1.5px solid #d1d9e6",
                background: category === cat ? "#4169e1" : "white",
                color: category === cat ? "white" : "#07103d",
                transition: "all 0.2s", fontFamily: "'DM Sans', sans-serif",
              }}>{cat || "All"}</button>
            ))}
          </div>

          {loading && (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#8898aa" }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>&#9203;</div>
              <p style={{ fontSize: 16 }}>Loading posts...</p>
            </div>
          )}

          {error && !loading && (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#fa2f07" }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>&#9888;&#65039;</div>
              <p style={{ fontSize: 16 }}>{error}</p>
            </div>
          )}

          {!loading && !error && (
            <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {posts.map((p) => {
                const cat = categoryColors[p.category] || categoryColors.Tips;
                return (
                  <div key={p._id} className="event-card" style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{
                      height: 180, borderRadius: 10, marginBottom: 20,
                      background: "linear-gradient(135deg, #07103d15, #4169e115)",
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40,
                    }}>&#128221;</div>
                    <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                      <span style={{
                        background: cat.bg, color: cat.color,
                        fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20,
                      }}>{p.category}</span>
                      {p.readTime && <span style={{ fontSize: 12, color: "#8898aa" }}>{p.readTime}</span>}
                    </div>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: "#07103d", marginBottom: 8, lineHeight: 1.4 }}>{p.title}</h3>
                    <p style={{ fontSize: 13.5, color: "#5a6577", lineHeight: 1.65, marginBottom: 16, flex: 1 }}>{p.excerpt}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #eef1f6", paddingTop: 14 }}>
                      <span style={{ fontSize: 12, color: "#8898aa" }}>{formatDate(p.createdAt)}</span>
                      <Link to={"/blog/" + p.slug} style={{ color: "#4169e1", fontWeight: 600, fontSize: 13, textDecoration: "none" }}>Read More &rarr;</Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#8898aa" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>&#128221;</div>
              <p style={{ fontSize: 16 }}>No posts found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
