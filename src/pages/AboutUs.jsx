import { Link } from "react-router-dom";
import { COLORS } from "../Layout";

const team = [
  { name: "Kalu Richard", role: "Founder & CEO", bio: "Years of experience in international education consulting, having placed 2,000+ students worldwide." },
  { name: "Oluwafemi Akindele Sanya", role: "Technical Director", bio: "PhD in Education Policy. Former university admissions officer with deep knowledge of UK and Canadian systems." },
  { name: "Placeholder", role: "Scholarship Advisor", bio: "Specialist in scholarship sourcing and applications. Has helped students secure over £2M in combined scholarships." },
  { name: "Place Holder", role: "Visa & Immigration Lead", bio: "Certified immigration consultant with a 99% visa success rate across UK, US, and Canadian student visas." },
];

const values = [
  { icon: "🎯", title: "Student-First Approach", desc: "Every decision we make prioritises your academic success and career aspirations." },
  { icon: "🤝", title: "Integrity & Transparency", desc: "No hidden fees, no misleading promises. We give you honest guidance at every step." },
  { icon: "🌍", title: "Global Perspective", desc: "We think beyond borders, connecting students with the best opportunities worldwide." },
  { icon: "⭐", title: "Excellence in Service", desc: "From first consultation to post-arrival support, we maintain the highest professional standards." },
];

export default function AboutUs() {
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
            <Link to="/">Home</Link> <span>›</span> <span style={{ color: "rgba(255,255,255,0.9)" }}>About Us</span>
          </div>
          <h1>About Borderline Innovations</h1>
          <p>Guiding students across borders into world-class educational opportunities since 2018.</p>
        </div>
      </div>

      {/* Story Section */}
      <section className="section-padding" style={{ padding: "80px 40px" }}>
        <div className="grid-2" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
          <div>
            <span className="section-label">Our Story</span>
            <h2 className="section-title" style={{ fontSize: 34, fontWeight: 700, color: COLORS.navy, marginBottom: 22, lineHeight: 1.2 }}>Built on a Mission to Transform Lives Through Education</h2>
            <p style={{ color: "#5a6577", fontSize: 15, lineHeight: 1.8, marginBottom: 18 }}>
              <strong style={{ color: COLORS.navy }}>Borderline Innovations</strong> was founded with a simple belief: every talented student deserves access to world-class education, regardless of where they come from. Since 2018, we've guided over 3,000 students from Africa to leading universities across four continents.
            </p>
            <p style={{ color: "#5a6577", fontSize: 15, lineHeight: 1.8, marginBottom: 28 }}>
              Our team of experienced academic counsellors, scholarship advisors, and immigration specialists work together to provide end-to-end support — from choosing the right programme to settling into your new academic home.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
              {[
                { num: "3,000+", label: "Students Placed" },
                { num: "150+", label: "Partner Universities" },
                { num: "99%", label: "Visa Success" },
                { num: "15+", label: "Countries" },
              ].map((s, i) => (
                <div key={i} style={{ background: "#f8fafc", borderRadius: 12, padding: "18px 16px", textAlign: "center" }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.royalBlue }}>{s.num}</div>
                  <div style={{ fontSize: 12, color: "#8898aa", fontWeight: 500, marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="about-box" style={{
            background: `linear-gradient(135deg, ${COLORS.navy}, ${COLORS.darkTeal})`,
            borderRadius: 20, padding: 44, position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", inset: 0, opacity: 0.06 }}>
              {[...Array(8)].map((_, i) => (
                <div key={i} style={{ position: "absolute", width: 140 + i * 28, height: 140 + i * 28, border: "1px solid white", borderRadius: "50%", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
              ))}
            </div>
            <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
              <div style={{ fontSize: 56, marginBottom: 18 }}>🌍</div>
              <h3 style={{ color: "white", fontSize: 22, fontWeight: 700, marginBottom: 14 }}>Our Global Reach</h3>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.7, marginBottom: 28 }}>With offices in Nigeria, Ghana, and Kenya, we serve students across the entire African continent.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[{ icon: "🇬🇧", label: "UK" }, { icon: "🇺🇸", label: "USA" }, { icon: "🇨🇦", label: "Canada" }, { icon: "🇪🇺", label: "Europe" }, { icon: "🇦🇺", label: "Australia" }, { icon: "🌍", label: "& More" }].map((d, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 20 }}>{d.icon}</span>
                    <span style={{ color: "white", fontWeight: 600, fontSize: 13 }}>{d.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding" style={{ padding: "80px 40px", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="section-label">What Drives Us</span>
            <h2 className="section-title" style={{ fontSize: 36, fontWeight: 700, color: COLORS.navy }}>Our Core Values</h2>
          </div>
          <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22 }}>
            {values.map((v, i) => (
              <div key={i} className="service-card" style={{ textAlign: "center" }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{v.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: COLORS.navy, marginBottom: 10 }}>{v.title}</h3>
                <p style={{ fontSize: 14, color: "#5a6577", lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding" style={{ padding: "80px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="section-label">The People Behind Borderline</span>
            <h2 className="section-title" style={{ fontSize: 36, fontWeight: 700, color: COLORS.navy }}>Meet Our Team</h2>
          </div>
          <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {team.map((t, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{
                  width: 90, height: 90, borderRadius: "50%", margin: "0 auto 18px",
                  background: `linear-gradient(135deg, ${COLORS.royalBlue}, ${COLORS.darkTeal})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "white", fontWeight: 700, fontSize: 28,
                }}>
                  {t.name.split(" ").map(n => n[0]).join("")}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: COLORS.navy, marginBottom: 4 }}>{t.name}</h3>
                <div style={{ fontSize: 13, color: COLORS.accent, fontWeight: 600, marginBottom: 10 }}>{t.role}</div>
                <p style={{ fontSize: 13, color: "#5a6577", lineHeight: 1.7 }}>{t.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
