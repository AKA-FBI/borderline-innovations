import { Link } from "react-router-dom";
import { COLORS } from "../Layout";

const scholarships = [
  { title: "Chevening Scholarship", country: "🇬🇧 United Kingdom", coverage: "Full Tuition + Living", deadline: "Nov 2026", level: "Postgraduate", desc: "UK government's global scholarship programme for future leaders. Covers tuition, living expenses, and return airfare." },
  { title: "Commonwealth Scholarship", country: "🇬🇧 United Kingdom", coverage: "Full Tuition + Stipend", deadline: "Dec 2026", level: "Postgraduate", desc: "For students from Commonwealth countries pursuing Master's or PhD programmes at UK universities." },
  { title: "DAAD Scholarship", country: "🇪🇺 Germany", coverage: "Full Tuition + €934/mo", deadline: "Oct 2026", level: "Postgraduate", desc: "Germany's largest funding organisation for international academic exchange. Multiple programmes available." },
  { title: "Mastercard Foundation Scholars", country: "🌍 Multiple", coverage: "Full Scholarship", deadline: "Varies", level: "Undergraduate", desc: "Provides comprehensive support to academically talented yet economically disadvantaged young people from Africa." },
  { title: "Canada-CARICOM Scholarship", country: "🇨🇦 Canada", coverage: "Full Tuition", deadline: "Feb 2027", level: "Undergraduate", desc: "Short-term exchange programme for students from CARICOM member states to study in Canada." },
  { title: "Australia Awards Scholarship", country: "🇦🇺 Australia", coverage: "Full Tuition + Living", deadline: "Apr 2027", level: "Postgraduate", desc: "Long-term development awards administered by the Department of Foreign Affairs and Trade." },
];

export default function Scholarships() {
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
            <Link to="/">Home</Link> <span>›</span> <span style={{ color: "rgba(255,255,255,0.9)" }}>Scholarships</span>
          </div>
          <h1>Scholarship Opportunities</h1>
          <p>Discover fully-funded and partial scholarships to help make your study abroad dream a reality.</p>
        </div>
      </div>

      <section className="section-padding" style={{ padding: "60px 40px", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{
            background: `linear-gradient(135deg, ${COLORS.navy}, ${COLORS.darkTeal})`,
            borderRadius: 16, padding: "36px 40px", marginBottom: 48, display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap",
          }}>
            <div style={{ fontSize: 48 }}>💰</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{ color: "white", fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Need help finding the right scholarship?</h3>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, lineHeight: 1.7 }}>Our scholarship advisors can match you with opportunities based on your profile, destination, and field of study.</p>
            </div>
            <Link to="/contact"><button className="btn-primary" style={{ padding: "14px 32px" }}>Book Free Consultation</button></Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {scholarships.map((s, i) => (
              <div key={i} className="event-card scholarship-card-row" style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
                <div style={{
                  width: 60, height: 60, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
                  background: `${COLORS.royalBlue}0D`, fontSize: 28, flexShrink: 0,
                }}>🎓</div>
                <div style={{ flex: 1, minWidth: 240 }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: COLORS.navy }}>{s.title}</h3>
                    <span style={{
                      background: s.level === "Postgraduate" ? "#fef3f2" : "#f0fdf4",
                      color: s.level === "Postgraduate" ? COLORS.accent : "#16a34a",
                      fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20,
                    }}>{s.level}</span>
                  </div>
                  <p style={{ fontSize: 14, color: "#5a6577", lineHeight: 1.7, marginBottom: 10 }}>{s.desc}</p>
                  <div style={{ display: "flex", gap: 24, flexWrap: "wrap", fontSize: 13, color: "#8898aa" }}>
                    <span>{s.country}</span>
                    <span>💵 {s.coverage}</span>
                    <span>📅 Deadline: {s.deadline}</span>
                  </div>
                </div>
                <Link to="/contact"><button className="btn-primary" style={{ padding: "10px 24px", fontSize: 13, alignSelf: "center" }}>Learn More →</button></Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}