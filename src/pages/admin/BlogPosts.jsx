import { useState, useEffect } from "react";
import api from "../../api";

const COLORS = { navy: "#07103d", royalBlue: "#4169e1", accent: "#fa2f07" };
const categories = ["Scholarships", "Tips", "Guides", "Visa", "News", "Student Life"];
const emptyForm = { title: "", slug: "", excerpt: "", content: "", category: "Tips", author: "Borderline Team", isPublished: false, featured: false, tags: "" };

export default function BlogPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const token = localStorage.getItem("admin_token");

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    try {
      const data = await api.getAuth("/blog/all", token);
      setPosts(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    if (name === "title" && editing === "new") {
      setForm((prev) => ({ ...prev, title: value, slug: value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [] };
      if (editing === "new") {
        await api.postAuth("/blog", payload, token);
      } else {
        await api.putAuth(`/blog/${editing._id}`, payload, token);
      }
      setEditing(null);
      setForm(emptyForm);
      fetchPosts();
    } catch (err) { alert(err.message); }
    finally { setSaving(false); }
  };

  const deletePost = async (id) => {
    if (!window.confirm("Delete this blog post?")) return;
    try {
      await api.deleteAuth(`/blog/${id}`, token);
      fetchPosts();
    } catch (err) { console.error(err); }
  };

  const startEdit = (post) => {
    setForm({ title: post.title, slug: post.slug, excerpt: post.excerpt, content: post.content || "", category: post.category, author: post.author || "Borderline Team", isPublished: post.isPublished, featured: post.featured, tags: post.tags ? post.tags.join(", ") : "" });
    setEditing(post);
  };

  if (editing !== null) {
    return (
      <div className="admin-card" style={{ maxWidth: 800 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: COLORS.navy, marginBottom: 24 }}>
          {editing === "new" ? "New Blog Post" : "Edit Post"}
        </h3>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label className="admin-label">Title *</label>
            <input className="admin-input" name="title" required value={form.title} onChange={handleChange} placeholder="Top 10 Scholarships for African Students" />
          </div>
          <div>
            <label className="admin-label">Slug</label>
            <input className="admin-input" name="slug" value={form.slug} onChange={handleChange} placeholder="top-10-scholarships" style={{ color: "#8898aa" }} />
          </div>
          <div>
            <label className="admin-label">Excerpt *</label>
            <textarea className="admin-input" name="excerpt" rows={2} required value={form.excerpt} onChange={handleChange} placeholder="Brief summary shown in blog listing..." style={{ resize: "vertical" }} />
          </div>
          <div>
            <label className="admin-label">Content *</label>
            <textarea className="admin-input" name="content" rows={10} required value={form.content} onChange={handleChange} placeholder="Full article content..." style={{ resize: "vertical" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            <div>
              <label className="admin-label">Category *</label>
              <select className="admin-select" name="category" value={form.category} onChange={handleChange} style={{ width: "100%" }}>
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="admin-label">Author</label>
              <input className="admin-input" name="author" value={form.author} onChange={handleChange} />
            </div>
            <div>
              <label className="admin-label">Tags (comma separated)</label>
              <input className="admin-input" name="tags" value={form.tags} onChange={handleChange} placeholder="scholarships, africa" />
            </div>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, cursor: "pointer" }}>
              <input type="checkbox" name="isPublished" checked={form.isPublished} onChange={handleChange} /> Published
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, cursor: "pointer" }}>
              <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} /> Featured
            </label>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={saving} style={{ padding: "12px 28px" }}>
              {saving ? "Saving..." : editing === "new" ? "Create Post" : "Save Changes"}
            </button>
            <button type="button" className="admin-btn admin-btn-outline" onClick={() => { setEditing(null); setForm(emptyForm); }}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <p style={{ color: "#5a6577", fontSize: 14 }}>{posts.length} posts total</p>
        <button className="admin-btn admin-btn-primary" onClick={() => { setForm(emptyForm); setEditing("new"); }}>+ New Post</button>
      </div>
      <div className="admin-card" style={{ padding: 0 }}>
        {loading ? <p style={{ padding: 24, color: "#8898aa" }}>Loading...</p> : (
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr><th>Title</th><th>Category</th><th>Status</th><th>Date</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {posts.map((p) => (
                  <tr key={p._id}>
                    <td style={{ fontWeight: 600, maxWidth: 300 }}>{p.title}</td>
                    <td><span className="status-badge" style={{ background: "#f0f4ff", color: COLORS.royalBlue }}>{p.category}</span></td>
                    <td>
                      <span className="status-badge" style={{ background: p.isPublished ? "#f0fdf4" : "#fef2f2", color: p.isPublished ? "#16a34a" : "#ef4444" }}>
                        {p.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td style={{ fontSize: 13, color: "#8898aa" }}>{new Date(p.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button className="admin-btn admin-btn-outline" style={{ padding: "4px 10px", fontSize: 11 }} onClick={() => startEdit(p)}>Edit</button>
                        <button className="admin-btn admin-btn-danger" style={{ padding: "4px 10px", fontSize: 11 }} onClick={() => deletePost(p._id)}>Delete</button>
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