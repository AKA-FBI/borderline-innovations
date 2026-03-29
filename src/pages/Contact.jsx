import { useState } from "react";
import { Link } from "react-router-dom";
import { COLORS } from "../Layout";
import api from "../api";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", country: "", level: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setStatus("submitting");
      setErrorMsg("");
      await api.post("/enquiries", form)
      setStatus("success");
      setForm({ name: "", email: "", phone: "", country: "", level: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Failed to submit. Please try again.");
    }
  };

  return (
    <>
      <div className="page-header">
        <div className="wave-bg">
          <svg viewBox="0 0 1200 400">
            {[...Array(8)].map((_, i) => (
              <path key={i} d={"M0 " + (100 + i * 35) + " Q300 " + (70 + i * 35) + " 600 " + (100 + i * 35) + " T1200 " + (100 + i * 35)} stroke="white" strokeWidth="0.6" fill="none" />
            ))}
          </svg>
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>&rsaquo;</span> <span style={{ color: "rgba(255,255,255,0.9)" }}>Apply / Contact</span>
          </div>
          <h1>Start Your Application</h1>
          <p>Fill in the form below and our team will get back to you within 24 hours with personalised guidance.</p>
        </div>
      </div>

      <section className="section-padding" style={{ padding: "60px 40px" }}>
        <div className="contact-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: COLORS.navy, marginBottom: 8 }}>Enquiry Form</h2>
            <p style={{ color: "#5a6577", fontSize: 14, lineHeight: 1.7, marginBottom: 32 }}>
              Tell us about yourself and what you are looking for. We will match you with the best programmes and scholarship opportunities.
            </p>

            {status === "success" ? (
              <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 12, padding: "32px 28px", textAlign: "center" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>&#9989;</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#16a34a", marginBottom: 8 }}>Application Submitted!</h3>
                <p style={{ color: "#5a6577", fontSize: 14, lineHeight: 1.7 }}>Thank you! Our team will review your enquiry and reach out within 24 hours.</p>
                <button className="btn-primary" onClick={() => setStatus("idle")} style={{ marginTop: 20 }}>Submit Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy, display: "block", marginBottom: 6 }}>Full Name *</label>
                  <input name="name" required value={form.name} onChange={handleChange} placeholder="Enter your full name" />
                </div>
                <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy, display: "block", marginBottom: 6 }}>Email Address *</label>
                    <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="your@email.com" />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy, display: "block", marginBottom: 6 }}>Phone Number</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+234..." />
                  </div>
                </div>
                <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy, display: "block", marginBottom: 6 }}>Preferred Destination</label>
                    <select name="country" value={form.country} onChange={handleChange} style={{
                      width: "100%", padding: "14px 18px", border: "1.5px solid #d1d9e6", borderRadius: 10,
                      fontSize: 15, fontFamily: "'DM Sans', sans-serif", background: "white", outline: "none", color: form.country ? "#191919" : "#999",
                    }}>
                      <option value="">Select country</option>
                      <option>United Kingdom</option>
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Germany</option>
                      <option>Australia</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy, display: "block", marginBottom: 6 }}>Study Level</label>
                    <select name="level" value={form.level} onChange={handleChange} style={{
                      width: "100%", padding: "14px 18px", border: "1.5px solid #d1d9e6", borderRadius: 10,
                      fontSize: 15, fontFamily: "'DM Sans', sans-serif", background: "white", outline: "none", color: form.level ? "#191919" : "#999",
                    }}>
                      <option value="">Select level</option>
                      <option>Foundation</option>
                      <option>Undergraduate</option>
                      <option>Postgraduate</option>
                      <option>PhD</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy, display: "block", marginBottom: 6 }}>Message / What are you looking for?</label>
                  <textarea name="message" rows={4} value={form.message} onChange={handleChange} placeholder="Tell us about your academic background and goals..." style={{ resize: "vertical" }} />
                </div>

                {status === "error" && (
                  <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "12px 16px", color: "#dc2626", fontSize: 14 }}>
                    {errorMsg}
                  </div>
                )}

                <button type="submit" className="btn-primary" disabled={status === "submitting"}
                  style={{ padding: "16px 36px", fontSize: 16, marginTop: 4, opacity: status === "submitting" ? 0.7 : 1 }}>
                  {status === "submitting" ? "Submitting..." : "Submit Application \u2192"}
                </button>
              </form>
            )}
          </div>

          <div>
            <div style={{
              background: "linear-gradient(135deg, #07103d, #0d4982)",
              borderRadius: 20, padding: 40, color: "white", marginBottom: 28,
            }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Get In Touch</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 22 }}>&#128205;</span>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: 2 }}>Office Address</div>
                    <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>Ado-Ekiti, Ekiti State, Nigeria</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 22 }}>&#128231;</span>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: 2 }}>Email</div>
                    <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>info@borderlineinnovations.com</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 22 }}>&#128241;</span>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: 2 }}>Phone</div>
                    <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>+234 (0) 800 000 0000</div>
                  </div>
                </div>
                <a href="https://wa.me/2348000000000" target="_blank" rel="noopener noreferrer" style={{
                  display: "flex", gap: 14, alignItems: "center", background: "rgba(37,211,102,0.15)",
                  padding: "14px 18px", borderRadius: 12, textDecoration: "none", color: "white",
                }}>
                  <span style={{ fontSize: 22 }}>&#128172;</span>
                  <div>
                    <div style={{ fontWeight: 600, color: "#25D366" }}>Chat on WhatsApp</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>Quick response, usually within minutes</div>
                  </div>
                </a>
              </div>
            </div>

            <div style={{ background: "#f8fafc", borderRadius: 16, padding: "28px 24px", border: "1px solid #e8ecf2" }}>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: "#07103d", marginBottom: 16 }}>Office Hours</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 14, color: "#5a6577" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span>Monday - Friday</span><span style={{ fontWeight: 600, color: "#07103d" }}>8:00 AM - 6:00 PM</span></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span>Saturday</span><span style={{ fontWeight: 600, color: "#07103d" }}>9:00 AM - 2:00 PM</span></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span>Sunday</span><span style={{ fontWeight: 600, color: "#999" }}>Closed</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}