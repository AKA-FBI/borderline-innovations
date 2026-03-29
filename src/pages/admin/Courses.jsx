import { useState, useEffect } from "react";
import api from "../../api";

const COLORS = { navy: "#07103d", royalBlue: "#4169e1", accent: "#fa2f07" };
const levels = ["Foundation", "Undergraduate", "Postgraduate", "PhD"];
const emptyForm = { title: "", university: "", country: "", countryFlag: "🇬🇧", level: "Undergraduate", duration: "", tuitionFee: "", description: "", intake: "", isActive: true, featured: false };

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null = list, "new" = create, object = edit
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const token = localStorage.getItem("admin_token");

  useEffect(() => { fetchCourses(); }, []);

  const fetchCourses = async () => {
    try {
      const data = await api.getAuth("/courses/all", token);
      setCourses(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing === "new") {
        await api.postAuth("/courses", form, token);
      } else {
        await api.putAuth(`/courses/${editing._id}`, form, token);
      }
      setEditing(null);
      setForm(emptyForm);
      fetchCourses();
    } catch (err) { alert(err.message); }
    finally { setSaving(false); }
  };

  const deleteCourse = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      await api.deleteAuth(`/courses/${id}`, token);
      fetchCourses();
    } catch (err) { console.error(err); }
  };

  const startEdit = (course) => {
    setForm({ title: course.title, university: course.university, country: course.country, countryFlag: course.countryFlag || "🇬🇧", level: course.level, duration: course.duration, tuitionFee: course.tuitionFee || "", description: course.description || "", intake: course.intake || "", isActive: course.isActive, featured: course.featured });
    setEditing(course);
  };

  // Form view
  if (editing !== null) {
    return (
      <div className="admin-card" style={{ maxWidth: 700 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: COLORS.navy, marginBottom: 24 }}>
          {editing === "new" ? "Add New Course" : "Edit Course"}
        </h3>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label className="admin-label">Course Title *</label>
            <input className="admin-input" name="title" required value={form.title} onChange={handleChange} placeholder="BSc Computer Science" />
          </div>
          <div>
            <label className="admin-label">University *</label>
            <input className="admin-input" name="university" required value={form.university} onChange={handleChange} placeholder="University of Manchester" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label className="admin-label">Country *</label>
              <input className="admin-input" name="country" required value={form.country} onChange={handleChange} placeholder="United Kingdom" />
            </div>
            <div>
              <label className="admin-label">Country Flag</label>
              <input className="admin-input" name="countryFlag" value={form.countryFlag} onChange={handleChange} placeholder="🇬🇧" />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            <div>
              <label className="admin-label">Level *</label>
              <select className="admin-select" name="level" value={form.level} onChange={handleChange} style={{ width: "100%" }}>
                {levels.map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="admin-label">Duration *</label>
              <input className="admin-input" name="duration" required value={form.duration} onChange={handleChange} placeholder="3 years" />
            </div>
            <div>
              <label className="admin-label">Intake</label>
              <input className="admin-input" name="intake" value={form.intake} onChange={handleChange} placeholder="September" />
            </div>
          </div>
          <div>
            <label className="admin-label">Description</label>
            <textarea className="admin-input" name="description" rows={3} value={form.description} onChange={handleChange} placeholder="Brief course description..." style={{ resize: "vertical" }} />
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, cursor: "pointer" }}>
              <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} /> Active
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, cursor: "pointer" }}>
              <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} /> Featured
            </label>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={saving} style={{ padding: "12px 28px" }}>
              {saving ? "Saving..." : editing === "new" ? "Add Course" : "Save Changes"}
            </button>
            <button type="button" className="admin-btn admin-btn-outline" onClick={() => { setEditing(null); setForm(emptyForm); }}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }

  // List view
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <p style={{ color: "#5a6577", fontSize: 14 }}>{courses.length} courses total</p>
        <button className="admin-btn admin-btn-primary" onClick={() => { setForm(emptyForm); setEditing("new"); }}>+ Add Course</button>
      </div>
      <div className="admin-card" style={{ padding: 0 }}>
        {loading ? <p style={{ padding: 24, color: "#8898aa" }}>Loading...</p> : (
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr><th>Title</th><th>University</th><th>Level</th><th>Country</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {courses.map((c) => (
                  <tr key={c._id}>
                    <td style={{ fontWeight: 600 }}>{c.title}</td>
                    <td style={{ fontSize: 13 }}>{c.university}</td>
                    <td><span className="status-badge" style={{ background: "#f0f4ff", color: COLORS.royalBlue }}>{c.level}</span></td>
                    <td>{c.countryFlag} {c.country}</td>
                    <td>
                      <span className="status-badge" style={{ background: c.isActive ? "#f0fdf415" : "#fef2f2", color: c.isActive ? "#16a34a" : "#ef4444" }}>
                        {c.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button className="admin-btn admin-btn-outline" style={{ padding: "4px 10px", fontSize: 11 }} onClick={() => startEdit(c)}>Edit</button>
                        <button className="admin-btn admin-btn-danger" style={{ padding: "4px 10px", fontSize: 11 }} onClick={() => deleteCourse(c._id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}