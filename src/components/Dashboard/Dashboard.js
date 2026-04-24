// src/components/Dashboard/Dashboard.js
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getProgress, getStreak, getSelectedExam } from "../../utils/storage";
import { EXAMS, getAllTopicsForExam } from "../../data/examData";

function StatCard({ icon, label, value, sub, color, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: "16px",
      padding: "24px", cursor: onClick ? "pointer" : "default",
      borderLeft: `4px solid ${color}`, transition: "transform 0.15s, box-shadow 0.15s",
      boxShadow: "var(--shadow-sm)"
    }}
      onMouseOver={e => { if (onClick) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; } }}
      onMouseOut={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; }}>
      <div style={{ fontSize: "28px", marginBottom: "8px" }}>{icon}</div>
      <div style={{ fontSize: "32px", fontWeight: "800", color: "var(--text-primary)", fontFamily: "var(--font-display)" }}>{value}</div>
      <div style={{ fontSize: "14px", color: "var(--text-secondary)", fontWeight: "600", marginTop: "4px" }}>{label}</div>
      {sub && <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px" }}>{sub}</div>}
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { examId, stats, streak, badges } = useMemo(() => {
    const examId = getSelectedExam(user.username);
    const progress = getProgress(user.username);
    const streak = getStreak(user.username);

    let total = 0, completed = 0;
    const examStats = {};

    Object.keys(EXAMS).forEach(eid => {
      const topics = getAllTopicsForExam(eid);
      let eDone = 0;
      topics.forEach(t => { if (progress[t.id]) eDone++; });
      examStats[eid] = { total: topics.length, done: eDone };
    });

    if (examId) {
      const topics = getAllTopicsForExam(examId);
      total = topics.length;
      topics.forEach(t => { if (progress[t.id]) completed++; });
    }

    const badges = [];
    if (streak.count >= 3) badges.push({ icon: "🔥", label: "3-Day Streak" });
    if (streak.count >= 7) badges.push({ icon: "⚡", label: "Week Warrior" });
    if (streak.count >= 30) badges.push({ icon: "🏆", label: "30-Day Champion" });
    const allProgress = Object.values(examStats);
    const anyDone = allProgress.find(e => e.done > 0);
    if (anyDone) badges.push({ icon: "🎯", label: "First Step" });
    if (completed >= 10) badges.push({ icon: "✅", label: "10 Topics Done" });
    if (completed >= 50) badges.push({ icon: "🌟", label: "50 Topics Pro" });
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    if (pct >= 50) badges.push({ icon: "💪", label: "Halfway Hero" });
    if (pct === 100 && total > 0) badges.push({ icon: "👑", label: "Exam Master" });

    const stats = { total, completed, remaining: total - completed, pct };
    return { examId, stats, streak, badges };
  }, [user]);

  const exam = examId ? EXAMS[examId] : null;
  const progress = getProgress(user.username);

  // Weak/Strong subjects
  const subjectInsights = useMemo(() => {
    if (!examId) return { weak: [], strong: [] };
    const insights = [];
    const ex = EXAMS[examId];
    Object.entries(ex.tiers).forEach(([tierId, tier]) => {
      Object.entries(tier.subjects).forEach(([subId, sub]) => {
        const done = sub.topics.filter(t => progress[`${examId}__${tierId}__${subId}__${t}`]).length;
        const pct = sub.topics.length > 0 ? Math.round((done / sub.topics.length) * 100) : 0;
        insights.push({ name: sub.name, pct, done, total: sub.topics.length });
      });
    });
    insights.sort((a, b) => a.pct - b.pct);
    return { weak: insights.slice(0, 2), strong: insights.filter(i => i.pct >= 70).slice(-2) };
  }, [examId, progress]);

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: "800", color: "var(--text-primary)", margin: 0, fontFamily: "var(--font-display)" }}>
          Good {new Date().getHours() < 12 ? "Morning" : new Date().getHours() < 17 ? "Afternoon" : "Evening"}, {user.name.split(" ")[0]}! 👋
        </h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "6px" }}>
          {exam ? `Tracking: ${exam.name} • ${exam.fullName}` : "Select an exam to start tracking your progress"}
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "28px" }}>
        <StatCard icon="📚" label="Total Topics" value={stats.total} color="#6366f1" sub={exam?.name || "No exam selected"} onClick={() => navigate("/topics")} />
        <StatCard icon="✅" label="Completed" value={stats.completed} color="#10b981" sub="Topics studied" onClick={() => navigate("/topics")} />
        <StatCard icon="⏳" label="Remaining" value={stats.remaining} color="#f59e0b" sub="Topics to go" onClick={() => navigate("/topics")} />
        <StatCard icon="📊" label="Progress" value={`${stats.pct}%`} color="#06b6d4" sub="Overall completion" onClick={() => navigate("/charts")} />
        <StatCard icon="🔥" label="Day Streak" value={streak.count} color="#ef4444" sub={streak.lastDate ? `Last: ${streak.lastDate}` : "Start today!"} />
      </div>

      {/* Progress Bar */}
      {stats.total > 0 && (
        <div style={{ background: "var(--card-bg)", borderRadius: "16px", padding: "24px", border: "1px solid var(--border)", marginBottom: "28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
            <span style={{ fontWeight: "700", color: "var(--text-primary)" }}>Overall Progress</span>
            <span style={{ fontWeight: "800", color: "var(--accent)" }}>{stats.pct}%</span>
          </div>
          <div style={{ height: "12px", background: "var(--bg-secondary)", borderRadius: "6px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${stats.pct}%`, background: "linear-gradient(90deg, var(--accent), #06b6d4)", borderRadius: "6px", transition: "width 0.5s ease" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{stats.completed} done</span>
            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{stats.remaining} remaining</span>
          </div>
        </div>
      )}

      {/* Two column: Exams + Insights */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "28px" }}>
        {/* All Exams Overview */}
        <div style={{ background: "var(--card-bg)", borderRadius: "16px", padding: "24px", border: "1px solid var(--border)" }}>
          <h3 style={{ margin: "0 0 16px", fontWeight: "800", color: "var(--text-primary)", fontSize: "15px" }}>All Exams Overview</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {Object.values(EXAMS).map(ex => {
              const topics = getAllTopicsForExam(ex.id);
              const done = topics.filter(t => progress[t.id]).length;
              const pct = topics.length > 0 ? Math.round((done / topics.length) * 100) : 0;
              return (
                <div key={ex.id} onClick={() => navigate("/exams")} style={{ cursor: "pointer" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-primary)" }}>{ex.icon} {ex.name}</span>
                    <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{done}/{topics.length}</span>
                  </div>
                  <div style={{ height: "6px", background: "var(--bg-secondary)", borderRadius: "3px" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: ex.color, borderRadius: "3px", transition: "width 0.4s" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Subject Insights */}
        <div style={{ background: "var(--card-bg)", borderRadius: "16px", padding: "24px", border: "1px solid var(--border)" }}>
          <h3 style={{ margin: "0 0 16px", fontWeight: "800", color: "var(--text-primary)", fontSize: "15px" }}>Subject Insights</h3>
          {!examId ? (
            <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>Select an exam to see insights</p>
          ) : (
            <>
              {subjectInsights.weak.length > 0 && (
                <div style={{ marginBottom: "16px" }}>
                  <div style={{ fontSize: "12px", fontWeight: "700", color: "#ef4444", marginBottom: "8px", letterSpacing: "0.5px" }}>⚠️ NEEDS ATTENTION</div>
                  {subjectInsights.weak.map(s => (
                    <div key={s.name} style={{ marginBottom: "8px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                        <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: "600" }}>{s.name}</span>
                        <span style={{ fontSize: "11px", color: "#ef4444", fontWeight: "700" }}>{s.pct}%</span>
                      </div>
                      <div style={{ height: "5px", background: "var(--bg-secondary)", borderRadius: "3px" }}>
                        <div style={{ height: "100%", width: `${s.pct}%`, background: "#ef4444", borderRadius: "3px" }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {subjectInsights.strong.length > 0 && (
                <div>
                  <div style={{ fontSize: "12px", fontWeight: "700", color: "#10b981", marginBottom: "8px", letterSpacing: "0.5px" }}>💪 STRONG SUBJECTS</div>
                  {subjectInsights.strong.map(s => (
                    <div key={s.name} style={{ marginBottom: "8px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                        <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: "600" }}>{s.name}</span>
                        <span style={{ fontSize: "11px", color: "#10b981", fontWeight: "700" }}>{s.pct}%</span>
                      </div>
                      <div style={{ height: "5px", background: "var(--bg-secondary)", borderRadius: "3px" }}>
                        <div style={{ height: "100%", width: `${s.pct}%`, background: "#10b981", borderRadius: "3px" }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {subjectInsights.weak.length === 0 && subjectInsights.strong.length === 0 && (
                <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>Start studying to see insights!</p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Badges */}
      <div style={{ background: "var(--card-bg)", borderRadius: "16px", padding: "24px", border: "1px solid var(--border)" }}>
        <h3 style={{ margin: "0 0 16px", fontWeight: "800", color: "var(--text-primary)", fontSize: "15px" }}>🏅 Achievement Badges</h3>
        {badges.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Complete topics and maintain streaks to earn badges!</p>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {badges.map(b => (
              <div key={b.label} style={{ display: "flex", alignItems: "center", gap: "8px", background: "var(--accent-subtle)", borderRadius: "20px", padding: "8px 16px", border: "1px solid var(--border)" }}>
                <span style={{ fontSize: "20px" }}>{b.icon}</span>
                <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--accent)" }}>{b.label}</span>
              </div>
            ))}
          </div>
        )}
        {/* Locked badges */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px", opacity: 0.4 }}>
          {[{ icon: "🏆", label: "30-Day Champion" }, { icon: "👑", label: "Exam Master" }, { icon: "🌟", label: "50 Topics Pro" }]
            .filter(b => !badges.find(ab => ab.label === b.label))
            .map(b => (
              <div key={b.label} style={{ display: "flex", alignItems: "center", gap: "8px", background: "var(--bg-secondary)", borderRadius: "20px", padding: "8px 16px", border: "1px solid var(--border)" }}>
                <span style={{ fontSize: "20px" }}>🔒</span>
                <span style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-muted)" }}>{b.label}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}