// src/components/Layout/Layout.js
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const navItems = [
  { path: "/dashboard", icon: "📊", label: "Dashboard" },
  { path: "/exams", icon: "📚", label: "My Exams" },
  { path: "/topics", icon: "✅", label: "Topic Tracker" },
  { path: "/charts", icon: "📈", label: "Analytics" },
  { path: "/notes", icon: "📝", label: "My Notes" },
  { path: "/strategy", icon: "🎯", label: "Strategy" },
  { path: "/settings", icon: "⚙️", label: "Settings" },
];

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => { logout(); navigate("/"); };

  const SidebarContent = () => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Logo */}
      <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ fontSize: "28px" }}>🎯</div>
          {sidebarOpen && (
            <div>
              <div style={{ fontWeight: "800", fontSize: "16px", color: "var(--text-primary)", fontFamily: "var(--font-display)", letterSpacing: "-0.3px" }}>GovExam</div>
              <div style={{ fontSize: "11px", color: "var(--accent)", fontWeight: "700", letterSpacing: "0.5px" }}>TRACKER PRO</div>
            </div>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: "4px" }}>
        {navItems.map(item => (
          <NavLink key={item.path} to={item.path} onClick={() => setMobileOpen(false)} style={({ isActive }) => ({
            display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px",
            borderRadius: "10px", textDecoration: "none", transition: "all 0.15s",
            background: isActive ? "var(--accent)" : "transparent",
            color: isActive ? "#fff" : "var(--text-secondary)",
            fontWeight: isActive ? "700" : "500", fontSize: "14px"
          })}>
            <span style={{ fontSize: "18px", minWidth: "20px", textAlign: "center" }}>{item.icon}</span>
            {sidebarOpen && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div style={{ padding: "16px 12px", borderTop: "1px solid var(--border)" }}>
        {sidebarOpen ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "800", fontSize: "15px" }}>
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: "700", fontSize: "13px", color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user?.name}</div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>@{user?.username}</div>
            </div>
            <button onClick={handleLogout} title="Logout" style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", color: "var(--text-muted)", padding: "4px" }}>🚪</button>
          </div>
        ) : (
          <button onClick={handleLogout} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", fontSize: "20px", padding: "6px", color: "var(--text-muted)" }} title="Logout">🚪</button>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-primary)", fontFamily: "var(--font-body)" }}>
      {/* Desktop Sidebar */}
      <aside style={{
        width: sidebarOpen ? "240px" : "68px", background: "var(--card-bg)", borderRight: "1px solid var(--border)",
        transition: "width 0.25s ease", flexShrink: 0, position: "sticky", top: 0, height: "100vh",
        display: "flex", flexDirection: "column",
      }}>
        <button onClick={() => setSidebarOpen(o => !o)} style={{
          position: "absolute", top: "20px", right: sidebarOpen ? "16px" : "50%", transform: sidebarOpen ? "none" : "translateX(50%)",
          background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "6px", cursor: "pointer",
          width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "12px", color: "var(--text-muted)", zIndex: 10, transition: "all 0.25s"
        }}>
          {sidebarOpen ? "◀" : "▶"}
        </button>
        <SidebarContent />
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 40 }} />
      )}
      <aside style={{
        position: "fixed", top: 0, left: mobileOpen ? 0 : "-260px", width: "240px", height: "100vh",
        background: "var(--card-bg)", borderRight: "1px solid var(--border)", zIndex: 50,
        transition: "left 0.25s ease",
      }}>
        <SidebarContent />
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Topbar */}
        <header style={{ height: "60px", background: "var(--card-bg)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", padding: "0 24px", gap: "16px", position: "sticky", top: 0, zIndex: 30 }}>
          <button onClick={() => setMobileOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "20px", display: "none", color: "var(--text-primary)" }} className="mobile-menu-btn">☰</button>
          <div style={{ flex: 1 }} />
          <button onClick={toggle} style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "8px", padding: "7px 12px", cursor: "pointer", fontSize: "16px", color: "var(--text-primary)" }}>
            {dark ? "☀️" : "🌙"}
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "800", fontSize: "14px" }}>
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-primary)" }}>{user?.name}</span>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, padding: "28px", overflowY: "auto" }}>
          {children}
        </main>
      </div>
    </div>
  );
}