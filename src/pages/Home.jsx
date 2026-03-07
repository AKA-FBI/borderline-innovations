import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { COLORS } from "../Layout";
import api from "../api";

// Animated counter
const Counter = ({ end, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const step = end / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= end) { setCount(end); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
};

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [subEmail, setSubEmail] = useState("");
  const [subStatus, setSubStatus] = useState("idle"); // idle, loading, success, error
  const [subMsg, setSubMsg] = useState("");

  const heroTexts = [
    { line1: "Your Gateway to", line2: "Global Education", sub: "Expert guidance for students seeking world-class education opportunities abroad. Apply to the university that fits your goals." },
    { line1: "Cross Borders,", line2: "Build Futures", sub: "We connect ambitious students with top universities and scholarship opportunities worldwide." },
    { line1: "Scholarships &", line2: "Visa Support", sub: "From application to arrival — we handle every step of your study abroad journey." },
  ];

  useEffect(() => {
    const interval = setInterval(() => setHeroIndex((p) => (p + 1) % heroTexts.length), 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = async () => {
    if (!subEmail || !subEmail.includes("@")) {
      setSubStatus("error");
      setSubMsg("Please enter a valid email.");
      return;
    }
    try {
      setSubStatus("loading");
      const data = await api.post("/newsletter/subscribe", { email: subEmail });
      setSubStatus("success");
      setSubMsg(data.message);
      setSubEmail("");
    } catch (err) {
      setSubStatus("error");
      setSubMsg(err.message || "Failed to subscribe.");
    }
  };

  const services = [
    { icon: "🎓", title: "University Placements", desc: "We partner with accredited universities across the UK, USA, Canada, and Europe to secure your ideal programme." },
    { icon: "💰", title: "Scholarship Access", desc: "Gain access to exclusive scholarships and funding opportunities tailored to your profile and academic goals." },
    { icon: "📋", title: "Visa Assistance", desc: "Our expert counsellors guide you through the visa application process with a proven track record of success." },
    { icon: "✈️", title: "Pre-Departure Support", desc: "From flight booking to accommodation, we ensure a smooth transition to your new academic home abroad." },
  ];

  const destinations = [
    { country: "United Kingdom", flag: "🇬🇧", unis: "150+ Partner Universities", color: COLORS.navy },
    { country: "United States", flag: "🇺🇸", unis: "80+ Partner Universities", color: COLORS.darkTeal },
    { country: "Canada", flag: "🇨🇦", unis: "60+ Partner Universities", color: COLORS.royalBlue },
    { country: "Europe", flag: "🇪🇺", unis: "40+ Partner Universities", color: "#1a3a6a" },
    { country: "Australia", flag: "🇦🇺", unis: "30+ Partner Universities", color: COLORS.darkTeal },
    { country: "Other Destinations", flag: "🌍", unis: "Worldwide Opportunities", color: COLORS.navy },
  ];

  const testimonials = [
    { name: "Adaeze Okonkwo", from: "Lagos, Nigeria", uni: "University of Manchester, UK", text: "Borderline Innovations made my dream of studying in the UK a reality. Their scholarship guidance saved me over £8,000 in tuition fees." },
    { name: "Kwame Asante", from: "Accra, Ghana", uni: "University of Toronto, Canada", text: "I was overwhelmed by the study abroad process until I found Borderline Innovations. They helped me secure a partial scholarship seamlessly." },
    { name: "Fatima Hassan", from: "Nairobi, Kenya", uni: "York St John University, UK", text: "The professionalism and dedication of the Borderline team is unmatched. They found the perfect programme for my career goals." },
  ];

  const events = [
    { date: "Mar 22", title: "Study Abroad Expo — Lagos", desc: "Meet university representatives and get on-the-spot application support.", tag: "Free Entry" },
    { date: "Apr 10", title: "Scholarship Workshop — Accra", desc: "Learn how to find and apply for fully-funded scholarships worldwide.", tag: "Limited Seats" },
    { date: "May 5", title: "UK Visa Masterclass — Virtual", desc: "Everything you need to know about the UK student visa process in 2026.", tag: "Online" },
  ];

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="hero-section" style={{
        background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.darkTeal} 50%, ${COLORS.royalBlue} 100%)`,
        padding: "80px 48px", position: "relative", minHeight: "75vh",
        display: "flex", alignItems: "center", overflow: "hidden",
      }}>
        <div className="wave-bg">
          <svg viewBox="0 0 1200 400">
            {[...Array(12)].map((_, i) => (
              <path key={i} d={`M0 ${80 + i * 28} Q150 ${60 + i * 28} 300 ${80 + i * 28} T600 ${80 + i * 28} T900 ${80 + i * 28} T1200 ${80 + i * 28}`}
                stroke="white" strokeWidth="0.8" fill="none" />
            ))}
          </svg>
        </div>
        <div style={{ position: "absolute", top: "12%", right: "6%", opacity: 0.06, animation: "planeFloat 6s ease-in-out infinite" }}>
          <svg width="180" height="100" viewBox="0 0 200 120">
            <path d="M20 80 L120 40 L180 20 L170 35 L130 50 L140 80 L125 65 L100 55 Z" fill="white" />
          </svg>
        </div>
        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 60, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 320 }}>
            <div style={{ animation: "fadeSlideUp 0.8s ease" }}>
              <span style={{
                display: "inline-block", background: `${COLORS.accent}22`, border: `1px solid ${COLORS.accent}44`,
                color: COLORS.accent, padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600, marginBottom: 28, letterSpacing: 0.5,
              }}>✈ Trusted by 3,000+ Students Worldwide</span>
            </div>
            <div key={heroIndex} style={{ animation: "fadeSlideUp 0.6s ease" }}>
              <h1 className="hero-h1" style={{ fontSize: 50, fontWeight: 700, color: "white", lineHeight: 1.12, marginBottom: 24, letterSpacing: -1 }}>
                {heroTexts[heroIndex].line1}<br />
                <span style={{ background: `linear-gradient(90deg, ${COLORS.accent}, #ff6b3d)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {heroTexts[heroIndex].line2}
                </span>
              </h1>
              <p className="hero-sub" style={{ fontSize: 16, color: "rgba(255,255,255,0.78)", lineHeight: 1.7, marginBottom: 36, maxWidth: 460 }}>
                {heroTexts[heroIndex].sub}
              </p>
            </div>
            <div className="hero-buttons" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Link to="/contact"><button className="btn-primary" style={{ fontSize: 15, padding: "14px 32px", textTransform: "uppercase", fontWeight: 700, letterSpacing: 1 }}>Apply Now</button></Link>
              <Link to="/scholarships"><button className="btn-outline">Explore Scholarships</button></Link>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 36 }}>
              {heroTexts.map((_, i) => (
                <div key={i} onClick={() => setHeroIndex(i)}
                  style={{ width: i === heroIndex ? 32 : 10, height: 10, borderRadius: 5, background: i === heroIndex ? COLORS.accent : "rgba(255,255,255,0.3)", cursor: "pointer", transition: "all 0.4s" }} />
              ))}
            </div>
          </div>
          <div style={{ flex: "0 0 420px", minWidth: 300 }}>
            <div style={{
              background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)", borderRadius: 16, padding: 28,
              border: "1px solid rgba(255,255,255,0.15)",
            }}>
              <h3 style={{ color: "white", fontSize: 18, fontWeight: 600, marginBottom: 20 }}>Find Your Course</h3>
              <div style={{ position: "relative" }}>
                <input type="text" placeholder="Start typing to search courses..." style={{
                  background: "rgba(255,255,255,0.95)", border: "none", borderRadius: 10, padding: "16px 50px 16px 18px", fontSize: 14, width: "100%",
                }} />
                <Link to="/find-course" style={{
                  position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
                  width: 36, height: 36, borderRadius: 8,
                  background: COLORS.royalBlue, display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", fontSize: 16, textDecoration: "none",
                }}>🔍</Link>
              </div>
              <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "nowrap" }}>
                {["Foundation", "Undergraduate", "Postgraduate"].map((t) => (
                  <Link to="/find-course" key={t} style={{
                    background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)",
                    padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 500, cursor: "pointer",
                    transition: "all 0.2s", border: "1px solid rgba(255,255,255,0.15)", textDecoration: "none",
                  }}>{t}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <svg style={{ position: "absolute", bottom: -2, left: 0, right: 0, zIndex: 2 }} viewBox="0 0 1320 60" preserveAspectRatio="none">
          <path d="M0 60 L0 30 Q330 0 660 30 Q990 60 1320 30 L1320 60 Z" fill={COLORS.accent} opacity="0.15" />
          <path d="M0 60 L0 40 Q330 10 660 40 Q990 70 1320 40 L1320 60 Z" fill={COLORS.royalBlue} opacity="0.1" />
        </svg>
      </section>

      {/* ============ STATS BAR ============ */}
      <section style={{ background: COLORS.navy, padding: "44px 28px", borderTop: `3px solid ${COLORS.accent}` }}>
        <div className="stats-grid" style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32, textAlign: "center" }}>
          {[
            { num: 3000, suffix: "+", label: "Students Enrolled" },
            { num: 150, suffix: "+", label: "Partner Universities" },
            { num: 99, suffix: "%", label: "Visa Success Rate" },
            { num: 15, suffix: "+", label: "Countries Covered" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div className="stat-number"><Counter end={s.num} suffix={s.suffix} /></div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section className="section-padding" style={{ padding: "90px 40px", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="section-label">What We Offer</span>
            <h2 className="section-title" style={{ fontSize: 38, fontWeight: 700, color: COLORS.navy, marginBottom: 14 }}>Our Services</h2>
            <p style={{ color: "#5a6577", fontSize: 16, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
              From finding the right programme to landing in your destination — we're with you at every stage.
            </p>
          </div>
          <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22 }}>
            {services.map((s, i) => (
              <div key={i} className="service-card">
                <div style={{ fontSize: 36, marginBottom: 18, width: 60, height: 60, display: "flex", alignItems: "center", justifyContent: "center", background: `${COLORS.royalBlue}0D`, borderRadius: 14 }}>{s.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: COLORS.navy, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: "#5a6577", lineHeight: 1.7 }}>{s.desc}</p>
                <div style={{ marginTop: 18 }}><Link to="/contact" style={{ color: COLORS.royalBlue, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>Learn more →</Link></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section className="section-padding" style={{ padding: "90px 40px" }}>
        <div className="grid-2" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
          <div>
            <span className="section-label">Who We Are</span>
            <h2 className="section-title" style={{ fontSize: 36, fontWeight: 700, color: COLORS.navy, marginBottom: 22, lineHeight: 1.2 }}>Your Trusted Partner in International Education</h2>
            <p style={{ color: "#5a6577", fontSize: 15, lineHeight: 1.8, marginBottom: 18 }}>
              <strong style={{ color: COLORS.navy }}>Borderline Innovations</strong> is a global education consultancy dedicated to guiding students across borders into world-class educational opportunities. We partner with over 150 accredited universities in the UK, USA, Canada, Europe, and beyond.
            </p>
            <p style={{ color: "#5a6577", fontSize: 15, lineHeight: 1.8, marginBottom: 28 }}>
              Our expert academic counsellors provide personalised guidance — from consultation and university selection to visa applications and pre-departure support.
            </p>
            <Link to="/about"><button className="btn-primary">Learn More About Us</button></Link>
          </div>
          <div className="about-box" style={{
            background: `linear-gradient(135deg, ${COLORS.navy}, ${COLORS.darkTeal})`, borderRadius: 20, padding: 44, position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", inset: 0, opacity: 0.06 }}>
              {[...Array(8)].map((_, i) => (
                <div key={i} style={{ position: "absolute", width: 140 + i * 28, height: 140 + i * 28, border: "1px solid white", borderRadius: "50%", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
              ))}
            </div>
            <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
              <div style={{ fontSize: 56, marginBottom: 18 }}>🌍</div>
              <h3 style={{ color: "white", fontSize: 22, fontWeight: 700, marginBottom: 14 }}>Global Reach</h3>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.7 }}>With offices in Nigeria, Ghana, Kenya and partners across 4 continents.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 28 }}>
                {[{ icon: "🇬🇧", label: "UK" }, { icon: "🇺🇸", label: "USA" }, { icon: "🇨🇦", label: "Canada" }, { icon: "🇪🇺", label: "Europe" }].map((d, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 22 }}>{d.icon}</span>
                    <span style={{ color: "white", fontWeight: 600, fontSize: 13 }}>{d.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ DESTINATIONS ============ */}
      <section className="section-padding" style={{ padding: "90px 40px", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="section-label">Where Will You Study?</span>
            <h2 className="section-title" style={{ fontSize: 38, fontWeight: 700, color: COLORS.navy }}>Study Destinations</h2>
          </div>
          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
            {destinations.map((d, i) => (
              <Link to="/find-course" key={i} style={{ textDecoration: "none" }}>
                <div className="dest-card" style={{ background: `linear-gradient(145deg, ${d.color}, ${d.color}cc)` }}>
                  <span style={{ fontSize: 44, marginBottom: 10 }}>{d.flag}</span>
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{d.country}</h3>
                  <p style={{ fontSize: 13, opacity: 0.8 }}>{d.unis}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="section-padding" style={{ padding: "90px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="section-label">Success Stories</span>
            <h2 className="section-title" style={{ fontSize: 38, fontWeight: 700, color: COLORS.navy }}>What Our Students Say</h2>
          </div>
          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div style={{ fontSize: 30, color: COLORS.accent, marginBottom: 14, fontFamily: "Georgia, serif" }}>"</div>
                <p style={{ fontSize: 14.5, color: "#4a5568", lineHeight: 1.75, marginBottom: 22 }}>{t.text}</p>
                <div style={{ borderTop: "1px solid #eef1f6", paddingTop: 18 }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.royalBlue}, ${COLORS.darkTeal})`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 15, marginBottom: 10 }}>
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div style={{ fontWeight: 700, color: COLORS.navy, fontSize: 14 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "#8898aa" }}>{t.from}</div>
                  <div style={{ fontSize: 12, color: COLORS.royalBlue, fontWeight: 500, marginTop: 2 }}>{t.uni}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ EVENTS ============ */}
      <section className="section-padding" style={{ padding: "90px 40px", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="section-label">Upcoming</span>
            <h2 className="section-title" style={{ fontSize: 38, fontWeight: 700, color: COLORS.navy }}>Events</h2>
          </div>
          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
            {events.map((e, i) => (
              <div key={i} className="event-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                  <div style={{ background: `linear-gradient(135deg, ${COLORS.navy}, ${COLORS.darkTeal})`, color: "white", padding: "12px 16px", borderRadius: 12, textAlign: "center", minWidth: 68 }}>
                    <div style={{ fontSize: 20, fontWeight: 700, lineHeight: 1 }}>{e.date.split(" ")[0]}</div>
                    <div style={{ fontSize: 11, opacity: 0.8, marginTop: 2 }}>{e.date.split(" ")[1]}</div>
                  </div>
                  <span style={{ background: `${COLORS.accent}15`, color: COLORS.accent, fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 20 }}>{e.tag}</span>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: COLORS.navy, marginBottom: 8 }}>{e.title}</h3>
                <p style={{ fontSize: 13.5, color: "#5a6577", lineHeight: 1.6 }}>{e.desc}</p>
                <div style={{ marginTop: 16 }}><Link to="/events" style={{ color: COLORS.royalBlue, fontWeight: 600, fontSize: 13, cursor: "pointer", textDecoration: "none" }}>Register Now →</Link></div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 44 }}>
            <Link to="/events"><button className="btn-primary">View All Events</button></Link>
          </div>
        </div>
      </section>

      {/* ============ CTA / NEWSLETTER ============ */}
      <section className="section-padding" style={{
        padding: "90px 32px", background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.darkTeal} 100%)`, position: "relative", overflow: "hidden",
      }}>
        <div className="wave-bg">
          <svg viewBox="0 0 1200 400">
            {[...Array(10)].map((_, i) => (
              <path key={i} d={`M0 ${100 + i * 30} Q200 ${80 + i * 30} 400 ${100 + i * 30} T800 ${100 + i * 30} T1200 ${100 + i * 30}`} stroke="white" strokeWidth="0.6" fill="none" />
            ))}
          </svg>
        </div>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <span style={{ fontSize: 44, display: "block", marginBottom: 18 }}>✈️</span>
          <h2 className="section-title" style={{ fontSize: 36, fontWeight: 700, color: "white", marginBottom: 14, lineHeight: 1.2 }}>Ready to Start Your Journey?</h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 16, lineHeight: 1.7, marginBottom: 36 }}>
            Subscribe for the latest scholarship opportunities, deadlines, and study abroad tips.
          </p>
          <div className="cta-email-row" style={{ display: "flex", gap: 10, maxWidth: 480, margin: "0 auto", background: "rgba(255,255,255,0.1)", borderRadius: 14, padding: 6 }}>
            <input type="email" placeholder="Enter your email address" value={subEmail} onChange={(e) => setSubEmail(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSubscribe(); }}
              style={{ flex: 1, background: "rgba(255,255,255,0.95)", border: "none", borderRadius: 10, padding: "14px 18px", fontSize: 14 }} />
            <button className="btn-primary" onClick={handleSubscribe} disabled={subStatus === "loading"}
              style={{ borderRadius: 10, whiteSpace: "nowrap", padding: "14px 24px", opacity: subStatus === "loading" ? 0.7 : 1 }}>
              {subStatus === "loading" ? "..." : "Subscribe"}
            </button>
          </div>
          {subMsg && (
            <p style={{ marginTop: 12, fontSize: 14, color: subStatus === "success" ? "#86efac" : "#fca5a5" }}>{subMsg}</p>
          )}
          <div className="cta-buttons" style={{ marginTop: 28, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/contact"><button className="btn-primary" style={{ fontSize: 15, padding: "14px 32px" }}>Apply Now →</button></Link>
            <Link to="/contact"><button className="btn-outline">Book a Consultation</button></Link>
          </div>
        </div>
      </section>
    </>
  );
}
