// src/components/Exams/TopicsPage.js
import React, { useState, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { EXAMS } from "../../data/examData";
import { getProgress, saveProgress, getSelectedExam } from "../../utils/storage";

export default function TopicsPage() {
  const { user } = useAuth();
  const [progress, setProgress] = useState(() => getProgress(user.username));
  const [selectedExam, setSelectedExam] = useState(() => getSelectedExam(user.username) || Object.keys(EXAMS)[0]);
  const [selectedTier, setSelectedTier] = useState(null);
  const [search, setSearch] = useState("");
  const [filterCompleted, setFilterCompleted] = useState("all");

  const exam = EXAMS[selectedExam];

  const activeTier = selectedTier || Object.keys(exam?.tiers || {})[0];

  const handleToggle = (topicId) => {
    const updated = { ...progress, [topicId]: !progress[topicId] };
    if (!updated[topicId]) delete updated[topicId];
    setProgress(updated);
    saveProgress(user.username, updated);
  };

  const handleToggleAll = (topicIds, value) => {
    const updated = { ...progress };
    topicIds.forEach(id => { if (value) updated[id] = true; else delete updated[id]; });
    setProgress(updated);
    saveProgress(user.username, updated);
  };

  const tierData = useMemo(() => {
    if (!exam || !exam.tiers[activeTier]) return {};
    return exam.tiers[activeTier].subjects;
  }, [exam, activeTier]);

  const getSubjectProgress = (subId) => {
    if (!exam || !exam.tiers[activeTier]) return { done: 0, total: 0 };
    const sub = exam.tiers[activeTier].subjects[subId];
    const done = sub.topics.filter(t => progress[`${selectedExam}__${activeTier}__${subId}__${t}`]).length;
    return { done, total: sub.topics.length };
  };

  const filteredTopics = (subId, topics) => topics.filter(t => {
    const id = `${selectedExam}__${activeTier}__${subId}__${t}`;
    const matchSearch = t.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filterCompleted === "all" || (filterCompleted === "done" && progress[id]) || (filterCompleted === "pending" && !progress[id]);
    return matchSearch && matchFilter;
  });

  if (!exam) return <div style={{ color: "var(--text-primary)" }}>No exam found</div>;

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: "800", color: "var(--text-primary)", margin: "0 0 8px", fontFamily: "var(--font-display)" }}>
          ✅ Topic Tracker
        </h1>
        <p style={{ color: "var(--text-secondary)", margin: 0 }}>Track your subject-wise preparation progress</p>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "24px", alignItems: "center" }}>
        <select value={selectedExam} onChange={e => { setSelectedExam(e.target.value); setSelectedTier(null); }}
          style={{ padding: "10px 14px", background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: "10px", color: "var(--text-primary)", fontWeight: "600", fontSize: "14px", cursor: "pointer" }}>
          {Object.values(EXAMS).map(ex => <option key={ex.id} value={ex.id}>{ex.icon} {ex.name}</option>)}
        </select>

        <input type="text" placeholder="🔍 Search topics..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ padding: "10px 14px", background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: "10px", color: "var(--text-primary)", fontSize: "14px", minWidth: "200px", outline: "none" }} />

        <select value={filterCompleted} onChange={e => setFilterCompleted(e.target.value)}
          style={{ padding: "10px 14px", background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: "10px", color: "var(--text-primary)", fontWeight: "600", fontSize: "14px", cursor: "pointer" }}>
          <option value="all">All Topics</option>
          <option value="done">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Tiers */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
        {Object.entries(exam.tiers).map(([tierId, tier]) => (
          <button key={tierId} onClick={() => setSelectedTier(tierId)} style={{
            padding: "8px 20px", borderRadius: "20px", border: "2px solid",
            borderColor: activeTier === tierId ? exam.color : "var(--border)",
            background: activeTier === tierId ? exam.color : "var(--card-bg)",
            color: activeTier === tierId ? "#fff" : "var(--text-secondary)",
            fontWeight: "700", fontSize: "13px", cursor: "pointer", transition: "all 0.15s"
          }}>
            {tier.name}
          </button>
        ))}
      </div>

      {/* Subjects */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {Object.entries(tierData).map(([subId, sub]) => {
          const { done, total } = getSubjectProgress(subId);
          const pct = total > 0 ? Math.round((done / total) * 100) : 0;
          const filtered = filteredTopics(subId, sub.topics);
          const allTopicIds = sub.topics.map(t => `${selectedExam}__${activeTier}__${subId}__${t}`);
          const allDone = allTopicIds.every(id => progress[id]);

          return (
            <div key={subId} style={{ background: "var(--card-bg)", borderRadius: "16px", border: "1px solid var(--border)", overflow: "hidden" }}>
              {/* Subject header */}
              <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)", background: `linear-gradient(135deg, ${exam.color}11, transparent)` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <div>
                    <div style={{ fontWeight: "800", fontSize: "16px", color: "var(--text-primary)" }}>{sub.name}</div>
                    <div style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "2px" }}>{done}/{total} topics completed</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontWeight: "800", fontSize: "20px", color: exam.color }}>{pct}%</span>
                    <button onClick={() => handleToggleAll(allTopicIds, !allDone)} style={{
                      padding: "6px 14px", background: allDone ? "#fee2e2" : exam.color + "22", border: `1px solid ${allDone ? "#fca5a5" : exam.color + "44"}`,
                      color: allDone ? "#dc2626" : exam.color, borderRadius: "8px", cursor: "pointer", fontWeight: "700", fontSize: "12px"
                    }}>
                      {allDone ? "Unmark All" : "Mark All"}
                    </button>
                  </div>
                </div>
                <div style={{ height: "8px", background: "var(--bg-secondary)", borderRadius: "4px" }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: exam.color, borderRadius: "4px", transition: "width 0.4s" }} />
                </div>
              </div>

              {/* Topics grid */}
              <div style={{ padding: "16px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "8px" }}>
                {filtered.length === 0 ? (
                  <div style={{ color: "var(--text-muted)", fontSize: "13px", padding: "8px 0" }}>No topics match your filter</div>
                ) : filtered.map(topic => {
                  const id = `${selectedExam}__${activeTier}__${subId}__${topic}`;
                  const done = !!progress[id];
                  return (
                    <label key={topic} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", padding: "8px 10px", borderRadius: "8px", transition: "background 0.15s", background: done ? exam.color + "15" : "transparent" }}
                      onMouseOver={e => { if (!done) e.currentTarget.style.background = "var(--bg-secondary)"; }}
                      onMouseOut={e => { if (!done) e.currentTarget.style.background = "transparent"; }}>
                      <input type="checkbox" checked={done} onChange={() => handleToggle(id)} style={{ display: "none" }} />
                      <div style={{
                        width: "18px", height: "18px", borderRadius: "4px", border: `2px solid ${done ? exam.color : "var(--border)"}`,
                        background: done ? exam.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0, transition: "all 0.15s"
                      }}>
                        {done && <span style={{ color: "#fff", fontSize: "11px", fontWeight: "800" }}>✓</span>}
                      </div>
                      <span style={{ fontSize: "13px", color: done ? exam.color : "var(--text-primary)", fontWeight: done ? "700" : "500", textDecoration: done ? "line-through" : "none", opacity: done ? 0.8 : 1 }}>
                        {topic}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}