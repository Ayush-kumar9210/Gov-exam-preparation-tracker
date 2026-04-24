// src/components/Notes/NotesPage.js
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getNotes, saveNotes } from "../../utils/storage";
import { EXAMS } from "../../data/examData";

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#06b6d4", "#8b5cf6", "#f97316"];

export default function NotesPage() {
  const { user } = useAuth();
  const [notes, setNotes] = useState(() => getNotes(user.username));
  const [form, setForm] = useState({ title: "", content: "", exam: "", color: COLORS[0] });
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [filterExam, setFilterExam] = useState("");
  const [showForm, setShowForm] = useState(false);

  const save = () => {
    if (!form.title.trim() || !form.content.trim()) return;
    const updated = editing !== null
      ? notes.map((n, i) => i === editing ? { ...form, updatedAt: new Date().toISOString() } : n)
      : [...notes, { ...form, id: Date.now(), createdAt: new Date().toISOString() }];
    setNotes(updated);
    saveNotes(user.username, updated);
    setForm({ title: "", content: "", exam: "", color: COLORS[0] });
    setEditing(null);
    setShowForm(false);
  };

  const del = (idx) => {
    if (!window.confirm("Delete this note?")) return;
    const updated = notes.filter((_, i) => i !== idx);
    setNotes(updated);
    saveNotes(user.username, updated);
  };

  const startEdit = (note, idx) => {
    setForm({ title: note.title, content: note.content, exam: note.exam || "", color: note.color || COLORS[0] });
    setEditing(idx);
    setShowForm(true);
  };

  const filtered = notes.filter(n => {
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase());
    const matchExam = !filterExam || n.exam === filterExam;
    return matchSearch && matchExam;
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "26px", fontWeight: "800", color: "var(--text-primary)", margin: 0, fontFamily: "var(--font-display)" }}>📝 My Notes</h1>
          <p style={{ color: "var(--text-secondary)", marginTop: "6px", margin: 0 }}>{notes.length} notes saved</p>
        </div>
        <button onClick={() => { setForm({ title: "", content: "", exam: "", color: COLORS[0] }); setEditing(null); setShowForm(true); }} style={{
          background: "var(--accent)", color: "#fff", border: "none", borderRadius: "10px", padding: "10px 20px",
          fontWeight: "700", fontSize: "14px", cursor: "pointer"
        }}>
          + New Note
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div style={{ background: "var(--card-bg)", borderRadius: "16px", padding: "24px", border: "2px solid var(--accent)", marginBottom: "24px" }}>
          <h3 style={{ margin: "0 0 16px", color: "var(--text-primary)", fontWeight: "800" }}>{editing !== null ? "Edit Note" : "New Note"}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <label style={labelS}>Title *</label>
              <input style={inputS} placeholder="Note title..." value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
            </div>
            <div>
              <label style={labelS}>Exam (optional)</label>
              <select style={inputS} value={form.exam} onChange={e => setForm(f => ({ ...f, exam: e.target.value }))}>
                <option value="">General</option>
                {Object.values(EXAMS).map(ex => <option key={ex.id} value={ex.id}>{ex.name}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={labelS}>Color Tag</label>
            <div style={{ display: "flex", gap: "8px", marginTop: "6px" }}>
              {COLORS.map(c => (
                <button key={c} onClick={() => setForm(f => ({ ...f, color: c }))} style={{
                  width: "28px", height: "28px", borderRadius: "50%", background: c, border: `3px solid ${form.color === c ? "var(--text-primary)" : "transparent"}`, cursor: "pointer"
                }} />
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={labelS}>Content *</label>
            <textarea style={{ ...inputS, height: "160px", resize: "vertical" }} placeholder="Write your notes here..." value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} />
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={save} style={{ background: "var(--accent)", color: "#fff", border: "none", borderRadius: "10px", padding: "10px 24px", fontWeight: "700", cursor: "pointer" }}>
              {editing !== null ? "Update Note" : "Save Note"}
            </button>
            <button onClick={() => { setShowForm(false); setEditing(null); }} style={{ background: "var(--bg-secondary)", color: "var(--text-secondary)", border: "1px solid var(--border)", borderRadius: "10px", padding: "10px 20px", fontWeight: "600", cursor: "pointer" }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
        <input placeholder="🔍 Search notes..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ ...inputS, maxWidth: "280px" }} />
        <select value={filterExam} onChange={e => setFilterExam(e.target.value)} style={{ ...inputS, maxWidth: "180px" }}>
          <option value="">All Exams</option>
          {Object.values(EXAMS).map(ex => <option key={ex.id} value={ex.id}>{ex.name}</option>)}
        </select>
      </div>

      {/* Notes Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--text-muted)" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>📭</div>
          <div style={{ fontWeight: "700", fontSize: "16px" }}>No notes yet</div>
          <div style={{ fontSize: "14px", marginTop: "4px" }}>Create your first note to get started!</div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
          {filtered.map((note, idx) => {
            const exam = note.exam ? EXAMS[note.exam] : null;
            const noteIdx = notes.findIndex(n => n === note);
            return (
              <div key={note.id || idx} style={{
                background: "var(--card-bg)", borderRadius: "14px", border: "1px solid var(--border)",
                borderTop: `4px solid ${note.color || COLORS[0]}`, overflow: "hidden",
                boxShadow: "var(--shadow-sm)", transition: "transform 0.15s, box-shadow 0.15s"
              }}
                onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; }}
                onMouseOut={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; }}>
                <div style={{ padding: "16px 18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <h4 style={{ margin: 0, fontWeight: "800", fontSize: "15px", color: "var(--text-primary)", flex: 1, paddingRight: "8px" }}>{note.title}</h4>
                    <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
                      <button onClick={() => startEdit(note, noteIdx)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: "14px", padding: "2px 6px" }}>✏️</button>
                      <button onClick={() => del(noteIdx)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: "14px", padding: "2px 6px" }}>🗑️</button>
                    </div>
                  </div>

                  {exam && (
                    <span style={{ fontSize: "11px", fontWeight: "700", background: (note.color || COLORS[0]) + "22", color: note.color || COLORS[0], padding: "3px 10px", borderRadius: "10px", display: "inline-block", marginBottom: "8px" }}>
                      {exam.icon} {exam.name}
                    </span>
                  )}

                  <p style={{ margin: 0, fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.6", maxHeight: "80px", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical" }}>
                    {note.content}
                  </p>
                </div>
                <div style={{ padding: "10px 18px", borderTop: "1px solid var(--border)", background: "var(--bg-secondary)", fontSize: "11px", color: "var(--text-muted)" }}>
                  {note.updatedAt
                    ? `Updated ${new Date(note.updatedAt).toLocaleDateString()}`
                    : note.createdAt ? `Created ${new Date(note.createdAt).toLocaleDateString()}` : ""}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const labelS = { display: "block", marginBottom: "6px", fontSize: "12px", fontWeight: "700", color: "var(--text-secondary)", letterSpacing: "0.3px" };
const inputS = { width: "100%", padding: "10px 12px", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "14px", color: "var(--text-primary)", outline: "none", boxSizing: "border-box" };