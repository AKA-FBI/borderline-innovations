import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import logoBlue from "./assets/logo-blue.png";
import logoWhite from "./assets/logo-white.png";

// Brand Colors
export const COLORS = {
  royalBlue: "#4169e1",
  darkTeal: "#0d4982",
  navy: "#07103d",
  accent: "#fa2f07",
  white: "#ffffff",
  dark: "#191919",
};

// Logo component
export const Logo = ({ variant = "default", height = 56 }) => {
  const src = variant === "light" ? logoWhite : logoBlue;
  return (
    <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
      <img src={src} alt="Borderline Innovations" style={{ height, width: "auto", objectFit: "contain" }} />
    </div>
  );
};

// Nav config — label → route path
const navItems = [
  { label: "Find Course", path: "/find-course", hasDropdown: true },
  { label: "Events", path: "/events", hasDropdown: false },
  { label: "Scholarships", path: "/scholarships", hasDropdown: true },
  { label: "About Us", path: "/about", hasDropdown: true },
  { label: "Blog", path: "/blog", hasDropdown: false },
  { label: "Contact", path: "/contact", hasDropdown: false },
];

// Social links
const socialLinks = [
  { icon: "f", href: "https://www.facebook.com", label: "Facebook" },
  { icon: "𝕏", href: "https://www.x.com", label: "Twitter" },
  { icon: "📷", href: "https://www.instagram.com", label: "Instagram" },
  { icon: "in", href: "https://www.linkedin.com", label: "LinkedIn" },
  { icon: "▶", href: "https://www.youtube.com", label: "YouTube" },
  { icon: "🎵", href: "https://www.tiktok.com", label: "TikTok" },
];

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: COLORS.dark, background: "#e5e7eb", minHeight: "100vh", display: "flex", justifyContent: "center" }}>
      {/* ============ CENTERED PAGE WRAPPER ============ */}
      <div className="page-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { width: 100%; min-height: 100vh; margin: 0; padding: 0; }
        #root { max-width: none !important; width: 100% !important; margin: 0 !important; padding: 0 !important; text-align: left !important; }
        html { scroll-behavior: smooth; }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes planeFloat {
          0%, 100% { transform: translate(0, 0) rotate(-5deg); }
          50% { transform: translate(10px, -8px) rotate(-2deg); }
        }
        @keyframes waveMove {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .page-wrapper {
          max-width: 1200px; width: 100%; margin: 0 auto;
          background: ${COLORS.white}; box-shadow: 0 0 60px rgba(0,0,0,0.1);
          position: relative; min-height: 100vh;
        }

        .top-bar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 8px 40px; border-bottom: 1px solid #e8ecf2;
          background: white; position: sticky; top: 0; z-index: 101;
          height: 72px; box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }
        .logo-mobile img { height: 160px; margin: -50px 0; }
        .footer-logo img { height: 120px; margin: -30px 0; }

        .nav-link-top {
          color: ${COLORS.navy}; text-decoration: none; font-size: 16px; font-weight: 500;
          padding: 8px 18px; cursor: pointer; transition: color 0.2s;
          display: flex; align-items: center; gap: 5;
        }
        .nav-link-top:hover { color: ${COLORS.royalBlue}; }
        .nav-link-top.active { color: ${COLORS.accent}; font-weight: 600; }

        .social-sidebar {
          position: fixed; left: calc(50vw + 600px); top: 50%; transform: translateY(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          z-index: 90; background: white; padding: 18px 8px;
          border-radius: 0 10px 10px 0; box-shadow: 2px 0 16px rgba(0,0,0,0.06); width: 60px;
        }
        .social-icon {
          width: 42px; height: 42px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.25s; font-size: 17px;
          color: #555; text-decoration: none; background: transparent; border: none;
        }
        .social-icon:hover { background: ${COLORS.royalBlue}12; color: ${COLORS.royalBlue}; transform: scale(1.1); }
        .social-sidebar-label {
          writing-mode: vertical-rl; text-orientation: mixed;
          font-size: 11px; font-weight: 700; letter-spacing: 2.5px;
          text-transform: uppercase; color: #999; margin-top: 14px;
        }

        .btn-primary {
          background: ${COLORS.accent}; color: white; border: none;
          padding: 14px 32px; border-radius: 8px; font-size: 15px; font-weight: 600;
          cursor: pointer; transition: all 0.3s; font-family: 'DM Sans', sans-serif; letter-spacing: 0.3px;
        }
        .btn-primary:hover { background: #e02800; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(250,47,7,0.3); }
        .btn-outline {
          background: transparent; color: white; border: 2px solid rgba(255,255,255,0.5);
          padding: 13px 30px; border-radius: 8px; font-size: 15px; font-weight: 600;
          cursor: pointer; transition: all 0.3s; font-family: 'DM Sans', sans-serif;
        }
        .btn-outline:hover { background: rgba(255,255,255,0.1); border-color: white; }

        .service-card {
          background: white; border-radius: 16px; padding: 36px 28px;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative; overflow: hidden; border: 1px solid #e8ecf2; cursor: pointer;
        }
        .service-card:hover { transform: translateY(-8px); box-shadow: 0 20px 60px rgba(7,16,61,0.12); border-color: ${COLORS.royalBlue}33; }
        .service-card::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, ${COLORS.royalBlue}, ${COLORS.accent}); transform: scaleX(0); transition: transform 0.35s;
        }
        .service-card:hover::after { transform: scaleX(1); }

        .dest-card {
          border-radius: 14px; padding: 32px 24px; color: white; position: relative;
          overflow: hidden; cursor: pointer; transition: all 0.35s; min-height: 160px;
          display: flex; flex-direction: column; justify-content: flex-end;
        }
        .dest-card:hover { transform: translateY(-5px) scale(1.02); box-shadow: 0 16px 48px rgba(0,0,0,0.2); }
        .dest-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%); }

        .testimonial-card { background: white; border-radius: 16px; padding: 36px 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #eef1f6; }
        .event-card { background: white; border-radius: 14px; padding: 28px; border: 1px solid #e8ecf2; transition: all 0.3s; cursor: pointer; }
        .event-card:hover { box-shadow: 0 12px 40px rgba(7,16,61,0.08); transform: translateY(-3px); }

        .section-label {
          display: inline-block; font-size: 12px; font-weight: 700;
          letter-spacing: 2.5px; text-transform: uppercase; color: ${COLORS.accent}; margin-bottom: 12px;
        }
        .stat-number { font-size: 48px; font-weight: 700; color: white; line-height: 1; margin-bottom: 6px; }
        .stat-label { font-size: 14px; color: rgba(255,255,255,0.75); font-weight: 400; }

        .wave-bg { position: absolute; inset: 0; overflow: hidden; z-index: 0; }
        .wave-bg svg { position: absolute; width: 200%; height: 100%; opacity: 0.04; animation: waveMove 25s linear infinite; }

        input, textarea {
          width: 100%; padding: 14px 18px; border: 1.5px solid #d1d9e6; border-radius: 10px;
          font-size: 15px; font-family: 'DM Sans', sans-serif; transition: all 0.25s; outline: none; background: white;
        }
        input:focus, textarea:focus { border-color: ${COLORS.royalBlue}; box-shadow: 0 0 0 3px ${COLORS.royalBlue}22; }

        .mobile-menu {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: ${COLORS.navy}; z-index: 999;
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px;
          animation: fadeSlideDown 0.3s ease;
        }
        .mobile-menu a { color: white; text-decoration: none; font-size: 20px; font-weight: 500; padding: 12px 24px; }

        /* Page header for inner pages */
        .page-header {
          background: linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.darkTeal} 50%, ${COLORS.royalBlue} 100%);
          padding: 80px 40px 60px; text-align: center; position: relative; overflow: hidden;
        }
        .page-header h1 { color: white; font-size: 42px; font-weight: 700; margin-bottom: 12px; }
        .page-header p { color: rgba(255,255,255,0.75); font-size: 17px; max-width: 560px; margin: 0 auto; line-height: 1.7; }
        .breadcrumb { display: flex; gap: 8px; justify-content: center; margin-bottom: 20px; font-size: 13px; }
        .breadcrumb a { color: rgba(255,255,255,0.6); text-decoration: none; }
        .breadcrumb a:hover { color: white; }
        .breadcrumb span { color: rgba(255,255,255,0.4); }

        /* === RESPONSIVE === */
        @media (max-width: 1300px) {
          .social-sidebar { display: none !important; }
        }
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
          .grid-4 { grid-template-columns: 1fr 1fr !important; }
          .grid-3 { grid-template-columns: 1fr 1fr !important; }
          .grid-2 { grid-template-columns: 1fr !important; gap: 48px !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
          .hero-h1 { font-size: 42px !important; }
          .section-padding { padding: 80px 28px !important; }
          .top-bar { padding: 14px 24px !important; }
          .main-nav { padding: 0 24px !important; }
          .email-label { display: none !important; }
          .page-header h1 { font-size: 34px !important; }
          .hero-search-box { flex: 1 1 100% !important; min-width: 0 !important; }
          .hero-content-wrapper { gap: 32px !important; }
        }
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: 1fr 1fr !important; gap: 28px !important; }
          .stat-number { font-size: 36px !important; }
          .hero-h1 { font-size: 34px !important; }
          .hero-sub { font-size: 15px !important; }
          .section-title { font-size: 30px !important; }
          .hero-section { min-height: auto !important; padding: 60px 24px !important; }
          .section-padding { padding: 60px 20px !important; }
          .hero-buttons { flex-direction: column !important; }
          .hero-buttons a, .hero-buttons button { width: 100%; text-align: center; }
          .cta-email-row { flex-direction: column !important; }
          .cta-email-row button { width: 100%; }
          .cta-buttons { flex-direction: column !important; align-items: stretch !important; }
          .cta-buttons a, .cta-buttons button { width: 100%; text-align: center; }
          .testimonial-card { padding: 28px 22px !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
          .footer-bottom { flex-direction: column !important; text-align: center !important; }
          .top-bar { flex-wrap: wrap; gap: 8px; }
          .top-bar-email { display: none !important; }
          .page-header { padding: 60px 24px 44px !important; }
          .page-header h1 { font-size: 28px !important; }
          .page-header p { font-size: 15px !important; }
          .hero-text-col { min-width: 0 !important; }
          .hero-search-box { flex: 1 1 100% !important; min-width: 0 !important; }
          .course-card-row { flex-direction: column !important; align-items: flex-start !important; }
          .course-meta { flex-direction: row !important; gap: 16px !important; flex-wrap: wrap !important; }
          .event-card-row { flex-direction: column !important; align-items: stretch !important; }
          .event-card-row .btn-primary { align-self: flex-start !important; }
          .scholarship-card-row { flex-direction: column !important; align-items: stretch !important; }
          .scholarship-card-row .btn-primary { align-self: flex-start !important; }
          .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .form-row { grid-template-columns: 1fr !important; }
          .filter-bar { flex-direction: column !important; }
          .filter-buttons { flex-wrap: wrap !important; }
          .filter-buttons button { flex: 1 1 auto !important; min-width: 70px !important; padding: 8px 14px !important; font-size: 13px !important; }
          .scholarship-highlight { flex-direction: column !important; text-align: center !important; }
          .scholarship-highlight .btn-primary { width: 100% !important; }
        }
        @media (max-width: 480px) {
          .grid-4 { grid-template-columns: 1fr !important; }
          .grid-3 { grid-template-columns: 1fr !important; }
          .hero-h1 { font-size: 26px !important; }
          .hero-section { padding: 40px 16px !important; min-height: auto !important; }
          .section-padding { padding: 40px 16px !important; }
          .section-title { font-size: 22px !important; }
          .stat-number { font-size: 24px !important; }
          .stat-label { font-size: 12px !important; }
          .service-card { padding: 28px 20px !important; }
          .dest-card { min-height: 120px !important; padding: 24px 18px !important; }
          .about-box { padding: 28px 18px !important; }
          .event-card { padding: 18px !important; }
          .top-bar { padding: 10px 14px !important; height: auto !important; min-height: 56px; }
          .logo-mobile { transform: scale(0.65); transform-origin: left center; }
          .logo-mobile img { height: 120px !important; margin: -35px 0 !important; }
          .page-header { padding: 44px 16px 36px !important; }
          .page-header h1 { font-size: 24px !important; }
          .page-header p { font-size: 14px !important; }
          .course-meta { gap: 12px !important; }
          .btn-primary { padding: 12px 24px !important; font-size: 14px !important; }
          .btn-outline { padding: 11px 22px !important; font-size: 14px !important; }
        }
      `}</style>

        {/* ============ TOP BAR ============ */}
        <div className="top-bar">
          <Link to="/" className="logo-mobile">
            <Logo variant="default" height={160} />
          </Link>

          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 4, flex: 1, justifyContent: "center" }}>
            {navItems.map((item) => (
              <Link key={item.label} to={item.path} className={`nav-link-top${location.pathname === item.path ? " active" : ""}`}>
                {item.label}
                {item.hasDropdown && <span style={{ fontSize: 10, color: "#999" }}>›</span>}
              </Link>
            ))}
          </div>

          <div className="top-bar-email" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 46, height: 46, borderRadius: "50%",
              background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.royalBlue})`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
            }}>✉️</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.navy }}>info@borderlineinnovations.com</div>
              <div className="email-label" style={{ fontSize: 12, color: "#8898aa" }}>Email Us</div>
            </div>
          </div>

          <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8, flexDirection: "column", gap: 5 }}>
            <span style={{ width: 26, height: 2.5, background: COLORS.navy, display: "block", borderRadius: 2 }} />
            <span style={{ width: 26, height: 2.5, background: COLORS.navy, display: "block", borderRadius: 2 }} />
            <span style={{ width: 18, height: 2.5, background: COLORS.navy, display: "block", borderRadius: 2 }} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="mobile-menu">
            <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: 24, right: 24, background: "none", border: "none", color: "white", fontSize: 28, cursor: "pointer" }}>✕</button>
            <Logo variant="light" height={120} />
            {navItems.map((item) => (
              <Link key={item.label} to={item.path} onClick={() => setMenuOpen(false)}>{item.label}</Link>
            ))}
            <Link to="/find-course" className="btn-primary" style={{ marginTop: 16, textDecoration: "none" }} onClick={() => setMenuOpen(false)}>Apply Now</Link>
          </div>
        )}

        {/* ============ PAGE CONTENT (from each route) ============ */}
        <Outlet />

        {/* ============ FOOTER ============ */}
        <footer style={{ background: COLORS.dark, padding: "72px 32px 36px", color: "rgba(255,255,255,0.65)" }}>
          <div className="footer-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gap: 44 }}>
            <div>
              <div className="footer-logo"><Logo variant="light" height={120} /></div>
              <p style={{ fontSize: 13, lineHeight: 1.8, marginTop: 18, maxWidth: 280 }}>
                Borderline Innovations is a global education consultancy helping students achieve their dream of studying abroad.
              </p>
              <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                {[
                  { icon: "f", href: "https://www.facebook.com" },
                  { icon: "𝕏", href: "https://www.x.com" },
                  { icon: "in", href: "https://www.linkedin.com" },
                  { icon: "📷", href: "https://www.instagram.com" },
                  { icon: "▶", href: "https://www.youtube.com" },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 13, color: "rgba(255,255,255,0.6)", textDecoration: "none", transition: "background 0.2s" }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.18)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}>{s.icon}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ color: "white", fontWeight: 700, fontSize: 14, marginBottom: 18 }}>Quick Links</h4>
              {[
                { label: "About Us", path: "/about" },
                { label: "Services", path: "/" },
                { label: "Courses", path: "/find-course" },
                { label: "Scholarships", path: "/scholarships" },
                { label: "Blog", path: "/blog" },
                { label: "FAQs", path: "/" },
              ].map((l) => (
                <div key={l.label} style={{ marginBottom: 11 }}>
                  <Link to={l.path} style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 13 }}
                    onMouseEnter={(e) => e.target.style.color = COLORS.accent}
                    onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.6)"}>{l.label}</Link>
                </div>
              ))}
            </div>
            <div>
              <h4 style={{ color: "white", fontWeight: 700, fontSize: 14, marginBottom: 18 }}>Destinations</h4>
              {["United Kingdom", "United States", "Canada", "Europe", "Australia"].map((l) => (
                <div key={l} style={{ marginBottom: 11 }}>
                  <Link to="/find-course" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 13 }}
                    onMouseEnter={(e) => e.target.style.color = COLORS.accent}
                    onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.6)"}>{l}</Link>
                </div>
              ))}
            </div>
            <div>
              <h4 style={{ color: "white", fontWeight: 700, fontSize: 14, marginBottom: 18 }}>Contact Us</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 13 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><span>📍</span><span>Ado-Ekiti, Ekiti State, Nigeria</span></div>
                <div style={{ display: "flex", gap: 10 }}><span>📧</span><span>info@borderlineinnovations.com</span></div>
                <div style={{ display: "flex", gap: 10 }}><span>📱</span><span>+234 (0) 800 000 0000</span></div>
                <div style={{ display: "flex", gap: 10 }}><span style={{ fontSize: 16 }}>💬</span><a href="https://wa.me/2348000000000" target="_blank" rel="noopener noreferrer" style={{ color: "#25D366", fontWeight: 600, cursor: "pointer", textDecoration: "none" }}>Chat on WhatsApp</a></div>
              </div>
            </div>
          </div>
          <div className="footer-bottom" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: 52, paddingTop: 24, maxWidth: 1100, margin: "52px auto 0", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <p style={{ fontSize: 12 }}>© 2026 Borderline Innovations. All Rights Reserved.</p>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              <Link to="/about" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 12 }}>Privacy Policy</Link>
              <Link to="/about" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 12 }}>Terms & Conditions</Link>
              <Link to="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 12 }}>Sitemap</Link>
            </div>
          </div>
        </footer>

      </div>{/* end page-wrapper */}

      {/* Social sidebar */}
      <div className="social-sidebar">
        {socialLinks.map((s, i) => (
          <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="social-icon" title={s.label}>{s.icon}</a>
        ))}
        <div className="social-sidebar-label">Connect With Us</div>
      </div>

      {/* WhatsApp button */}
      <a href="https://wa.me/2348000000000" target="_blank" rel="noopener noreferrer"
        style={{
          position: "fixed", bottom: 28, right: 28, width: 58, height: 58, borderRadius: "50%",
          background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(37,211,102,0.4)", zIndex: 90, transition: "transform 0.3s",
          textDecoration: "none", fontSize: 26,
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>💬</a>
    </div>
  );
}