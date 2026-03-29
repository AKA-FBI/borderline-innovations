import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { COLORS } from "../Layout";
import api from "../api";

export default function FindCourse() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [level, setLevel] = useState(searchParams.get("level") || "All");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const debounceRef = useRef(null);

  // Fetch courses when level changes or on initial load
  useEffect(() => {
    fetchCourses();
  }, [level]);

  // Also fetch on mount if search param exists
  useEffect(() => {
    const s = searchParams.get("search");
    const l = searchParams.get("level");
    if (s) setSearch(s);
    if (l && l !== "All") setLevel(l);
    fetchCourses(s || "", l || "All");
  }, [searchParams]);

  const fetchCourses = async (searchVal, levelVal) => {
    try {
      setLoading(true);
      const s = searchVal !== undefined ? searchVal : search;
      const l = levelVal !== undefined ? levelVal : level;
      const params = new URLSearchParams();
      if (l && l !== "All") params.append("level", l);
      if (s) params.append("search", s);
      const data = await api.get(`/courses?${params.toString()}`);
      setCourses(data.courses);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    } finally {
      setLoading(false);
    }
  };

  // Autocomplete as user types
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (val.length < 2) { setSuggestions([]); setShowSuggestions(false); return; }
    debounceRef.current = setTimeout(async () => {
      try {
        const data = await api.get(`/courses?search=${encodeURIComponent(val)}&limit=6`);
        setSuggestions(data.courses || []);
        setShowSuggestions(true);
      } catch (err) { setSuggestions([]); }
    }, 300);
  };

  const handleSearch = () => {
    setShowSuggestions(false);
    fetchCourses(search, level);
  };

  const handleSuggestionClick = (title) => {
    setSearch(title);
    setShowSuggestions(false);
    fetchCourses(title, level);
  };

  const handleKeyDown = (e) => { if (e.key === "Enter") handleSearch(); };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handler = (e) => { if (searchRef.current && !searchRef.current.contains(e.target)) setShowSuggestions(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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
            <div ref={searchRef} style={{ flex: 1, minWidth: 0, position: "relative" }}>
              <input type="text" placeholder="Search courses or universities..." value={search}
                onChange={handleSearchChange} onKeyDown={handleKeyDown}
                onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
                style={{ padding: "16px 50px 16px 18px", fontSize: 15, borderRadius: 12, border: "1.5px solid #d1d9e6", width: "100%" }} />
              <span onClick={handleSearch} style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", fontSize: 18, cursor: "pointer" }}>🔍</span>
              {/* Autocomplete dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div style={{
                  position: "absolute", top: "100%", left: 0, right: 0, marginTop: 4,
                  background: "white", borderRadius: 10, boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                  overflow: "hidden", zIndex: 50, border: "1px solid #e8ecf2",
                }}>
                  {suggestions.map((c) => (
                    <div key={c._id} onClick={() => handleSuggestionClick(c.title)}
                      style={{
                        padding: "12px 18px", cursor: "pointer", borderBottom: "1px solid #f0f0f0",
                        transition: "background 0.15s", fontSize: 14, color: COLORS.navy,
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "#f8fafc"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "white"}>
                      <div style={{ fontWeight: 600 }}>{c.title}</div>
                      <div style={{ fontSize: 12, color: "#8898aa", marginTop: 2 }}>{c.university} · {c.countryFlag} {c.country}</div>
                    </div>
                  ))}
                </div>
              )}
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
                      <Link to="/contact"><button className="btn-primary" style={{ padding: "10px 22px", fontSize: 13 }}>Enquire for Details →</button></Link>
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