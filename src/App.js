// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import AuthPage from "./components/Auth/AuthPage";
import Layout from "./components/Layout/Layout";
import Dashboard from "./components/Dashboard/Dashboard";
import ExamsPage from "./components/Exams/ExamsPage";
import TopicsPage from "./components/Exams/TopicsPage";
import ChartsPage from "./components/Charts/ChartsPage";
import NotesPage from "./components/Notes/NotesPage";
import StrategyPage from "./components/Strategy/StrategyPage";
import SettingsPage from "./components/Settings/SettingsPage";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-primary)", color: "var(--text-primary)", fontFamily: "var(--font-body)" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎯</div>
        <div style={{ fontWeight: "700", fontSize: "16px", color: "var(--text-secondary)" }}>Loading...</div>
      </div>
    </div>
  );
  return user ? <Layout>{children}</Layout> : <Navigate to="/" replace />;
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <Navigate to="/dashboard" replace /> : children;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PublicRoute><AuthPage /></PublicRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/exams" element={<ProtectedRoute><ExamsPage /></ProtectedRoute>} />
            <Route path="/topics" element={<ProtectedRoute><TopicsPage /></ProtectedRoute>} />
            <Route path="/charts" element={<ProtectedRoute><ChartsPage /></ProtectedRoute>} />
            <Route path="/notes" element={<ProtectedRoute><NotesPage /></ProtectedRoute>} />
            <Route path="/strategy" element={<ProtectedRoute><StrategyPage /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}