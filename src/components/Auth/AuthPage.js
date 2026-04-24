// src/components/Auth/AuthPage.js
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ username: "", name: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const { dark, toggle } = useTheme();

  const handle = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (mode === "signup") {
      if (!form.name.trim()) return setError("Name is required"), setLoading(false);
      if (form.password !== form.confirm) return setError("Passwords do not match"), setLoading(false);
      if (form.password.length < 6) return setError("Password must be at least 6 characters"), setLoading(false);
      const res = signup(form.username.trim(), form.name.trim(), form.password);
      if (!res.success) setError(res.error);
    } else {
      const res = login(form.username.trim(), form.password);
      if (!res.success) setError(res.error);
    }
    setLoading(false);
  };

  const exams = ["SSC CGL", "Bank PO", "UPSC", "Railway NTPC", "CTET", "Police"];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", fontFamily: "var(--font-body)" }}>
      {/* Background decoration */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "-20%", right: "-10%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "-20%", left: "-10%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)" }} />
      </div>

      <div style={{ width: "100%", maxWidth: "480px", position: "relative" }}>
        {/* Theme toggle */}
        <button onClick={toggle} style={{ position: "absolute", top: "-50px", right: 0, background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: "8px", padding: "8px 14px", cursor: "pointer", color: "var(--text-primary)", fontSize: "18px" }}>
          {dark ? "☀️" : "🌙"}
        </button>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "52px", marginBottom: "12px" }}>🎯</div>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "var(--text-primary)", margin: 0, fontFamily: "var(--font-display)", letterSpacing: "-0.5px" }}>
            GovExam Tracker
          </h1>
          <p style={{ color: "var(--text-secondary)", marginTop: "8px", fontSize: "15px" }}>
            Your complete government exam preparation companion
          </p>
        </div>

        {/* Exam pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginBottom: "28px" }}>
          {exams.map(e => (
            <span key={e} style={{ fontSize: "12px", background: "var(--accent-subtle)", color: "var(--accent)", padding: "4px 12px", borderRadius: "20px", fontWeight: "600" }}>
              {e}
            </span>
          ))}
        </div>

        {/* Card */}
        <div style={{ background: "var(--card-bg)", borderRadius: "20px", padding: "36px", border: "1px solid var(--border)", boxShadow: "var(--shadow-lg)" }}>
          {/* Tabs */}
          <div style={{ display: "flex", background: "var(--bg-secondary)", borderRadius: "10px", padding: "4px", marginBottom: "28px" }}>
            {["login", "signup"].map(m => (
              <button key={m} onClick={() => { setMode(m); setError(""); }} style={{
                flex: 1, padding: "10px", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "700", fontSize: "14px", transition: "all 0.2s",
                background: mode === m ? "var(--accent)" : "transparent",
                color: mode === m ? "#fff" : "var(--text-secondary)"
              }}>
                {m === "login" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          <form onSubmit={handle}>
            {error && (
              <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", color: "#dc2626", padding: "12px 16px", borderRadius: "10px", marginBottom: "20px", fontSize: "14px", fontWeight: "600" }}>
                ⚠️ {error}
              </div>
            )}

            {mode === "signup" && (
              <div style={{ marginBottom: "16px" }}>
                <label style={labelStyle}>Full Name</label>
                <input style={inputStyle} type="text" placeholder="John Doe" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
              </div>
            )}

            <div style={{ marginBottom: "16px" }}>
              <label style={labelStyle}>Username</label>
              <input style={inputStyle} type="text" placeholder="johndoe123" value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} required />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={labelStyle}>Password</label>
              <input style={inputStyle} type="password" placeholder="••••••••" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required />
            </div>

            {mode === "signup" && (
              <div style={{ marginBottom: "16px" }}>
                <label style={labelStyle}>Confirm Password</label>
                <input style={inputStyle} type="password" placeholder="••••••••" value={form.confirm} onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))} required />
              </div>
            )}

            <button type="submit" disabled={loading} style={{
              width: "100%", padding: "14px", background: "var(--accent)", color: "#fff",
              border: "none", borderRadius: "12px", fontWeight: "800", fontSize: "16px",
              cursor: "pointer", marginTop: "8px", letterSpacing: "0.3px",
              opacity: loading ? 0.7 : 1, transition: "all 0.2s",
              boxShadow: "0 4px 15px rgba(99,102,241,0.4)"
            }}>
              {loading ? "Please wait..." : mode === "login" ? "Sign In →" : "Create Account →"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "var(--text-secondary)" }}>
            {mode === "login" ? "New here? " : "Already have an account? "}
            <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}
              style={{ background: "none", border: "none", color: "var(--accent)", fontWeight: "700", cursor: "pointer", fontSize: "14px" }}>
              {mode === "login" ? "Create Account" : "Sign In"}
            </button>
          </p>
        </div>

        <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "13px", marginTop: "20px" }}>
          All data stored locally on your device 🔒
        </p>
      </div>
    </div>
  );
}

const labelStyle = { display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "700", color: "var(--text-secondary)", letterSpacing: "0.3px" };
const inputStyle = {
  width: "100%", padding: "12px 14px", background: "var(--bg-secondary)", border: "1px solid var(--border)",
  borderRadius: "10px", fontSize: "15px", color: "var(--text-primary)", outline: "none", boxSizing: "border-box",
  transition: "border-color 0.2s"
};