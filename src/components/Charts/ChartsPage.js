// src/components/Charts/ChartsPage.js
import React, { useMemo, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { EXAMS, getAllTopicsForExam } from "../../data/examData";
import { getProgress, getSelectedExam, getStreak } from "../../utils/storage";
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, LineElement, PointElement,
  ArcElement, Title, Tooltip, Legend, Filler
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend, Filler);

export default function ChartsPage() {
  const { user } = useAuth();
  const progress = getProgress(user.username);
  const selectedExamId = getSelectedExam(user.username);
  const streak = getStreak(user.username);

  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const textColor = isDark ? "#94a3b8" : "#64748b";
  const gridColor = isDark ? "#1e293b" : "#f1f5f9";

  const barData = useMemo(() => {
    if (!selectedExamId) return null;
    const exam = EXAMS[selectedExamId];
    const labels = [], done = [], total = [];
    Object.entries(exam.tiers).forEach(([tierId, tier]) => {
      Object.entries(tier.subjects).forEach(([subId, sub]) => {
        const d = sub.topics.filter(t => progress[`${selectedExamId}__${tierId}__${subId}__${t}`]).length;
        labels.push(sub.name.length > 20 ? sub.name.substring(0, 18) + "…" : sub.name);
        done.push(d);
        total.push(sub.topics.length);
      });
    });
    return { labels, done, total };
  }, [selectedExamId, progress]);

  const allExamsData = useMemo(() => {
    return Object.values(EXAMS).map(exam => {
      const topics = getAllTopicsForExam(exam.id);
      const d = topics.filter(t => progress[t.id]).length;
      return { name: exam.name, done: d, total: topics.length, pct: topics.length ? Math.round((d / topics.length) * 100) : 0, color: exam.color };
    });
  }, [progress]);

  const streakHistory = useMemo(() => {
    const today = new Date();
    const labels = [];
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const ds = d.toISOString().split("T")[0];
      labels.push(d.toLocaleDateString("en", { weekday: "short" }));
      data.push(streak.history?.includes(ds) ? 1 : 0);
    }
    return { labels, data };
  }, [streak]);

  const commonOpts = {
    responsive: true,
    plugins: { legend: { labels: { color: textColor, font: { family: "DM Sans, sans-serif", weight: "600" } } }, tooltip: { mode: "index", intersect: false } },
    scales: {
      x: { ticks: { color: textColor }, grid: { color: gridColor } },
      y: { ticks: { color: textColor }, grid: { color: gridColor } }
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: "800", color: "var(--text-primary)", margin: 0, fontFamily: "var(--font-display)" }}>📈 Analytics</h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "6px" }}>Visual insights into your preparation progress</p>
      </div>

      {/* Top stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "16px", marginBottom: "28px" }}>
        {allExamsData.map(ex => (
          <div key={ex.name} style={{ background: "var(--card-bg)", borderRadius: "12px", padding: "16px", border: "1px solid var(--border)", textAlign: "center" }}>
            <div style={{ fontSize: "22px", fontWeight: "800", color: ex.color, fontFamily: "var(--font-display)" }}>{ex.pct}%</div>
            <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--text-primary)", marginTop: "4px" }}>{ex.name}</div>
            <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{ex.done}/{ex.total}</div>
            <div style={{ height: "4px", background: "var(--bg-secondary)", borderRadius: "2px", marginTop: "8px" }}>
              <div style={{ height: "100%", width: `${ex.pct}%`, background: ex.color, borderRadius: "2px" }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
        {/* Subject Bar Chart */}
        <div style={{ background: "var(--card-bg)", borderRadius: "16px", padding: "24px", border: "1px solid var(--border)" }}>
          <h3 style={{ margin: "0 0 20px", fontWeight: "800", color: "var(--text-primary)", fontSize: "15px" }}>
            📊 Subject Progress {selectedExamId ? `— ${EXAMS[selectedExamId]?.name}` : ""}
          </h3>
          {!barData ? (
            <div style={{ textAlign: "center", color: "var(--text-muted)", padding: "40px 0" }}>Select an exam to see subject breakdown</div>
          ) : (
            <Bar data={{
              labels: barData.labels,
              datasets: [
                { label: "Completed", data: barData.done, backgroundColor: "#6366f188", borderColor: "#6366f1", borderWidth: 2, borderRadius: 6 },
                { label: "Total", data: barData.total, backgroundColor: "#94a3b844", borderColor: "#94a3b8", borderWidth: 1, borderRadius: 6 }
              ]
            }} options={{ ...commonOpts, plugins: { ...commonOpts.plugins, title: { display: false } } }} />
          )}
        </div>

        {/* Doughnut - All exams */}
        <div style={{ background: "var(--card-bg)", borderRadius: "16px", padding: "24px", border: "1px solid var(--border)" }}>
          <h3 style={{ margin: "0 0 20px", fontWeight: "800", color: "var(--text-primary)", fontSize: "15px" }}>🍩 Overall Completion</h3>
          <Doughnut data={{
            labels: allExamsData.map(e => e.name),
            datasets: [{
              data: allExamsData.map(e => e.pct || 1),
              backgroundColor: allExamsData.map(e => e.color + "cc"),
              borderColor: allExamsData.map(e => e.color),
              borderWidth: 2
            }]
          }} options={{
            responsive: true,
            plugins: {
              legend: { position: "bottom", labels: { color: textColor, font: { family: "DM Sans, sans-serif", size: 11 }, padding: 8 } },
              tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed}%` } }
            },
            cutout: "65%"
          }} />
        </div>
      </div>

      {/* Streak + Line chart */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {/* Weekly Streak */}
        <div style={{ background: "var(--card-bg)", borderRadius: "16px", padding: "24px", border: "1px solid var(--border)" }}>
          <h3 style={{ margin: "0 0 20px", fontWeight: "800", color: "var(--text-primary)", fontSize: "15px" }}>🔥 Weekly Activity</h3>
          <Bar data={{
            labels: streakHistory.labels,
            datasets: [{
              label: "Active Day",
              data: streakHistory.data,
              backgroundColor: streakHistory.data.map(d => d ? "#f97316cc" : "#94a3b844"),
              borderColor: streakHistory.data.map(d => d ? "#f97316" : "#94a3b8"),
              borderWidth: 2, borderRadius: 8
            }]
          }} options={{
            ...commonOpts,
            plugins: { ...commonOpts.plugins, legend: { display: false } },
            scales: { x: { ticks: { color: textColor }, grid: { display: false } }, y: { display: false, max: 1.5, grid: { display: false } } }
          }} />
          <div style={{ textAlign: "center", marginTop: "12px" }}>
            <span style={{ fontSize: "28px", fontWeight: "800", color: "#f97316" }}>{streak.count}</span>
            <span style={{ fontSize: "14px", color: "var(--text-secondary)", marginLeft: "8px" }}>day streak 🔥</span>
          </div>
        </div>

        {/* Progress comparison line */}
        <div style={{ background: "var(--card-bg)", borderRadius: "16px", padding: "24px", border: "1px solid var(--border)" }}>
          <h3 style={{ margin: "0 0 20px", fontWeight: "800", color: "var(--text-primary)", fontSize: "15px" }}>📉 Completion Comparison</h3>
          <Bar data={{
            labels: allExamsData.map(e => e.name),
            datasets: [{
              label: "% Completed",
              data: allExamsData.map(e => e.pct),
              backgroundColor: allExamsData.map(e => e.color + "99"),
              borderColor: allExamsData.map(e => e.color),
              borderWidth: 2, borderRadius: 8
            }]
          }} options={{
            ...commonOpts,
            plugins: { ...commonOpts.plugins, legend: { display: false } },
            scales: {
              x: { ticks: { color: textColor, font: { size: 10 } }, grid: { display: false } },
              y: { min: 0, max: 100, ticks: { color: textColor, callback: v => v + "%" }, grid: { color: gridColor } }
            }
          }} />
        </div>
      </div>
    </div>
  );
}