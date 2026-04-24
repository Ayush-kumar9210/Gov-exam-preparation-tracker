// src/components/Settings/SettingsPage.js
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getProgress, saveProgress, getNotes, saveNotes, getStreak, saveStreak, storage } from "../../utils/storage";

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("success");

  const showMsg = (text, type = "success") => {
    setMsg(text); setMsgType(type);
    setTimeout(() => setMsg(""), 3000);
  };

  const resetProgress = () => {
    if (!window.confirm("Reset all topic progress? This cannot be undone.")) return;
    saveProgress(user.username, {});
    showMsg("✅ All progress reset successfully!");
  };

  const clearNotes = () => {
    if (!window.confirm("Delete all notes? This cannot be undone.")) return;
    saveNotes(user.username, []);
    showMsg("✅ All notes deleted!");
  };

  const resetStreak = () => {
    if (!window.confirm("Reset your streak?")) return;
    saveStreak(user.username, { count: 0, lastDate: null, history: [] });
    showMsg("✅ Streak reset!");
  };

  const exportData = () => {
    const data = {
      user: user,
      progress: getProgress(user.username),
      notes: getNotes(user.username),
      streak: getStreak(user.username),
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `govexam-backup-${user.username}.json`; a.click();
    URL.revokeObjectURL(url);
    showMsg("✅ Data exported successfully!");
  };

  const clearAllData = () => {
    if (!window.confirm("⚠️ This will delete ALL your data including progress, notes, and account. Are you sure?")) return;
    if (!window.confirm("Last confirmation: Delete everything?")) return;
    storage.clear();
    logout();
    navigate("/");
  };

  const stats = {
    topics: Object.keys(getProgress(user.username)).length,
    notes: getNotes(user.username).length,
    streak: getStreak(user.username).count,
  };

  const Section = ({ title, icon, children }) => (
    <div style={{ background: "var(--card-bg)", borderRadius: "14px", padding: "24px", border: "1px solid var(--border)", marginBottom: "16px" }}>
      <h3 style={{ margin: "0 0 16px", fontWeight: "800", color: "var(--text-primary)", fontSize: "16px" }}>{icon} {title}</h3>
      {children}
    </div>
  );

  const ActionBtn = ({ label, desc, onClick, danger }) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid var(--border)" }}>
      <div>
        <div style={{ fontWeight: "600", fontSize: "14px", color: danger ? "#dc2626" : "var(--text-primary)" }}>{label}</div>
        <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>{desc}</div>
      </div>
      <button onClick={onClick} style={{
        padding: "8px 18px", borderRadius: "8px", border: danger ? "1px solid #fca5a5" : "1px solid var(--border)",
        background: danger ? "#fee2e2" : "var(--bg-secondary)", color: danger ? "#dc2626" : "var(--text-primary)",
        fontWeight: "700", fontSize: "13px", cursor: "pointer"
      }}>
        {label.split(" ")[0]}
      </button>
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: "800", color: "var(--text-primary)", margin: 0, fontFamily: "var(--font-display)" }}>⚙️ Settings</h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "6px" }}>Manage your account and app preferences</p>
      </div>

      {msg && (
        <div style={{ background: msgType === "success" ? "#d1fae5" : "#fee2e2", color: msgType === "success" ? "#065f46" : "#dc2626", padding: "12px 16px", borderRadius: "10px", marginBottom: "20px", fontWeight: "700", fontSize: "14px" }}>
          {msg}
        </div>
      )}

      {/* Profile */}
      <Section title="Profile" icon="👤">
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "800", fontSize: "24px" }}>
            {user.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <div style={{ fontWeight: "800", fontSize: "18px", color: "var(--text-primary)" }}>{user.name}</div>
            <div style={{ color: "var(--text-muted)", fontSize: "14px" }}>@{user.username}</div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginTop: "20px" }}>
          {[
            { label: "Topics Done", value: stats.topics, icon: "✅" },
            { label: "Notes Saved", value: stats.notes, icon: "📝" },
            { label: "Day Streak", value: stats.streak, icon: "🔥" }
          ].map(s => (
            <div key={s.label} style={{ background: "var(--bg-secondary)", borderRadius: "10px", padding: "14px", textAlign: "center" }}>
              <div style={{ fontSize: "20px" }}>{s.icon}</div>
              <div style={{ fontWeight: "800", fontSize: "22px", color: "var(--accent)" }}>{s.value}</div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Data Management */}
      <Section title="Data Management" icon="💾">
        <ActionBtn label="Export Data" desc="Download all your data as JSON backup" onClick={exportData} />
        <ActionBtn label="Reset Progress" desc="Clear all topic checkmarks (keeps notes & account)" onClick={resetProgress} danger />
        <ActionBtn label="Clear Notes" desc="Delete all saved notes permanently" onClick={clearNotes} danger />
        <ActionBtn label="Reset Streak" desc="Reset your daily study streak counter" onClick={resetStreak} danger />
        <div style={{ paddingTop: "14px" }}>
          <ActionBtn label="Delete Account" desc="⚠️ Permanently delete all data and logout" onClick={clearAllData} danger />
        </div>
      </Section>

      {/* About */}
      <Section title="About" icon="ℹ️">
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {[
            ["App", "GovExam Tracker Pro"],
            ["Version", "1.0.0"],
            ["Supported Exams", "SSC CGL, SSC CHSL, Railway NTPC, Bank PO, Bank Clerk, UPSC, CTET, Police"],
            ["Storage", "All data stored locally in your browser"],
            ["Privacy", "No data sent to any server"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", gap: "16px", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
              <span style={{ fontWeight: "700", fontSize: "13px", color: "var(--text-secondary)", minWidth: "130px" }}>{k}</span>
              <span style={{ fontSize: "13px", color: "var(--text-primary)" }}>{v}</span>
            </div>
          ))}
        </div>
      </Section>

      <button onClick={() => { logout(); navigate("/"); }} style={{
        width: "100%", padding: "14px", background: "#fee2e2", color: "#dc2626",
        border: "1px solid #fca5a5", borderRadius: "12px", fontWeight: "800", fontSize: "15px",
        cursor: "pointer", marginTop: "8px"
      }}>
        🚪 Sign Out
      </button>
    </div>
  );
}