import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { COLORS } from "../Layout";
import api from "../api";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await api.get("/events");
        setEvents(data.events);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const month = d.toLocaleString("en-US", { month: "short" });
    const day = d.getDate();
    return { month, day };
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
            <Link to="/">Home</Link> <span>›</span> <span style={{ color: "rgba(255,255,255,0.9)" }}>Events</span>
          </div>
          <h1>Upcoming Events</h1>
          <p>Join our workshops, expos, and masterclasses to kickstart your study abroad journey.</p>
        </div>
      </div>

      <section className="section-padding" style={{ padding: "60px 40px", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#8898aa" }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>⏳</div>
              <p>Loading events...</p>
            </div>
          ) : events.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#8898aa" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📅</div>
              <p style={{ fontSize: 16 }}>No upcoming events at the moment. Check back soon!</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              {events.map((e) => {
                const { month, day } = formatDate(e.date);
                return (
                  <div key={e._id} className="event-card event-card-row" style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
                    <div style={{
                      background: `linear-gradient(135deg, ${COLORS.navy}, ${COLORS.darkTeal})`,
                      color: "white", padding: "18px 20px", borderRadius: 14, textAlign: "center", minWidth: 80, flexShrink: 0,
                    }}>
                      <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1 }}>{day}</div>
                      <div style={{ fontSize: 13, opacity: 0.8, marginTop: 4 }}>{month}</div>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
                        <h3 style={{ fontSize: 19, fontWeight: 700, color: COLORS.navy }}>{e.title}</h3>
                        <span style={{ background: `${COLORS.accent}15`, color: COLORS.accent, fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20 }}>{e.tag}</span>
                      </div>
                      <p style={{ fontSize: 14, color: "#5a6577", lineHeight: 1.7, marginBottom: 12 }}>{e.description}</p>
                      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", fontSize: 13, color: "#8898aa" }}>
                        <span>📍 {e.location}</span>
                        {e.time && <span>🕐 {e.time}</span>}
                      </div>
                    </div>
                    <Link to="/contact"><button className="btn-primary" style={{ padding: "12px 28px", fontSize: 14, alignSelf: "center" }}>Register →</button></Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}