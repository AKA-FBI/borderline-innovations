import { Link } from "react-router-dom";
import { COLORS } from "../Layout";

export default function NotFound() {
  return (
    <>
      <section style={{
        background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.darkTeal} 50%, ${COLORS.royalBlue} 100%)`,
        minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center",
        padding: "60px 24px", textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div className="wave-bg">
          <svg viewBox="0 0 1200 400">
            {[...Array(8)].map((_, i) => (
              <path key={i} d={`M0 ${100 + i * 35} Q300 ${70 + i * 35} 600 ${100 + i * 35} T1200 ${100 + i * 35}`} stroke="white" strokeWidth="0.6" fill="none" />
            ))}
          </svg>
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 520 }}>
          <div style={{ fontSize: 80, marginBottom: 16 }}>✈️</div>
          <h1 style={{ fontSize: 72, fontWeight: 700, color: "white", lineHeight: 1, marginBottom: 12 }}>404</h1>
          <h2 style={{ fontSize: 26, fontWeight: 600, color: "white", marginBottom: 16 }}>Page Not Found</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, lineHeight: 1.7, marginBottom: 36 }}>
            Looks like this page has taken off to a different destination. Let's get you back on track.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/"><button className="btn-primary" style={{ fontSize: 15, padding: "14px 32px" }}>Back to Home</button></Link>
            <Link to="/find-course"><button className="btn-outline" style={{ fontSize: 15, padding: "13px 30px" }}>Find a Course</button></Link>
          </div>
        </div>
      </section>
    </>
  );
}