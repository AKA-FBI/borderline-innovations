import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { COLORS } from "../Layout";
import api from "../api";

export default function FindCourse() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("All");

  useEffect(() => {
    fetchCourses();
  }, [level]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (level !== "All") params.append("level", level);
      if (search) params.append("search", search);
      const data = await api.get(`/courses?${params.toString()}`);
      setCourses(data.courses);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => fetchCourses();
  const handleKeyDown = (e) => { if (e.key === "Enter") fetchCourses(); };

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
            <Link to="/">Home</Link> <span>›</span> <span style={{ color: "rgba(255,255,255,0.9)" }}>Find a Course</span>
          </div>
          <h1>Find Your Course</h1>
          <p>Browse programmes across 150+ partner universities worldwide. Filter by level, search by name, and find your perfect fit.</p>
        </div>
      </div>

      <section className="section-padding" style={{ padding: "60px 40px", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="filter-bar" style={{ display: "flex", gap: 16, marginBottom: 44, flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ flex: 1, minWidth: 0, position: "relative" }}>
              <input type="text" placeholder="Search courses or universities..." value={search}
                onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyDown}
                style={{ padding: "16px 50px 16px 18px", fontSize: 15, borderRadius: 12, border: "1.5px solid #d1d9e6", width: "100%" }} />
              <span onClick={handleSearch} style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", fontSize: 18, cursor: "pointer" }}>🔍</span>
            </div>
            <div className="filter-buttons" style={{ display: "flex", gap: 8 }}>
              {["All", "Foundation", "Undergraduate", "Postgraduate"].map((l) => (
                <button key={l} onClick={() => setLevel(l)} style={{
                  padding: "10px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer",
                  border: level === l ? "none" : "1.5px solid #d1d9e6",
                  background: level === l ? COLORS.royalBlue : "white",
                  color: level === l ? "white" : COLORS.navy,
                  transition: "all 0.2s", fontFamily: "'DM Sans', sans-serif",
                }}>{l}</button>
              ))}
            </div>
          </div>

          <p style={{ color: "#5a6577", fontSize: 14, marginBottom: 24 }}>
            Showing <strong style={{ color: COLORS.navy }}>{courses.length}</strong> courses
          </p>

          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#8898aa" }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>⏳</div>
              <p>Loading courses...</p>
            </div>
          ) : (
            <>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {courses.map((c) => (
                  <div key={c._id} className="event-card course-card-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <span style={{
                        display: "inline-block", background: c.level === "Foundation" ? "#f0f4ff" : c.level === "Undergraduate" ? "#f0fdf4" : "#fef3f2",
                        color: c.level === "Foundation" ? COLORS.royalBlue : c.level === "Undergraduate" ? "#16a34a" : COLORS.accent,
                        fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20, marginBottom: 8,
                      }}>{c.level}</span>
                      <h3 style={{ fontSize: 18, fontWeight: 700, color: COLORS.navy, marginBottom: 4 }}>{c.title}</h3>
                      <p style={{ fontSize: 14, color: "#5a6577" }}>{c.university}</p>
                    </div>
                    <div className="course-meta" style={{ display: "flex", gap: 28, alignItems: "center", flexWrap: "wrap" }}>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 12, color: "#8898aa", marginBottom: 2 }}>Country</div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.navy }}>{c.countryFlag} {c.country}</div>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 12, color: "#8898aa", marginBottom: 2 }}>Duration</div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.navy }}>{c.duration}</div>
                      </div>
                      <Link to="/contact"><button className="btn-primary" style={{ padding: "10px 22px", fontSize: 13 }}>Apply →</button></Link>
                    </div>
                  </div>
                ))}
              </div>
              {courses.length === 0 && (
                <div style={{ textAlign: "center", padding: "60px 20px", color: "#8898aa" }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                  <p style={{ fontSize: 16 }}>No courses found matching your search. Try different keywords or filters.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}