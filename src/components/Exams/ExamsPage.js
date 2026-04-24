// src/components/Exams/ExamsPage.js
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { EXAMS, getAllTopicsForExam } from "../../data/examData";
import { getProgress, getSelectedExam, saveSelectedExam } from "../../utils/storage";

export default function ExamsPage() {
  const { user } = useAuth();
  const progress = getProgress(user.username);
  const [selected, setSelected] = useState(getSelectedExam(user.username));
  const [saved, setSaved] = useState(false);

  const handleSelect = (examId) => {
    setSelected(examId);
    saveSelectedExam(user.username, examId);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: "800", color: "var(--text-primary)", margin: 0, fontFamily: "var(--font-display)" }}>
          📚 Select Your Exam
        </h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "6px" }}>
          Choose your primary exam for focused tracking. You can switch anytime.
        </p>
        {saved && <div style={{ marginTop: "10px", background: "#d1fae5", color: "#065f46", padding: "10px 16px", borderRadius: "8px", fontWeight: "700", fontSize: "14px" }}>✅ Exam selection saved!</div>}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
        {Object.values(EXAMS).map(exam => {
          const topics = getAllTopicsForExam(exam.id);
          const done = topics.filter(t => progress[t.id]).length;
          const pct = topics.length > 0 ? Math.round((done / topics.length) * 100) : 0;
          const isSelected = selected === exam.id;

          return (
            <div key={exam.id} onClick={() => handleSelect(exam.id)} style={{
              background: "var(--card-bg)", borderRadius: "16px", padding: "24px", cursor: "pointer",
              border: `2px solid ${isSelected ? exam.color : "var(--border)"}`,
              transition: "all 0.2s", boxShadow: isSelected ? `0 4px 20px ${exam.color}33` : "var(--shadow-sm)"
            }}
              onMouseOver={e => { if (!isSelected) e.currentTarget.style.borderColor = exam.color + "88"; }}
              onMouseOut={e => { if (!isSelected) e.currentTarget.style.borderColor = "var(--border)"; }}>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <div>
                  <div style={{ fontSize: "32px" }}>{exam.icon}</div>
                </div>
                {isSelected && (
                  <div style={{ background: exam.color, color: "#fff", borderRadius: "20px", padding: "4px 12px", fontSize: "11px", fontWeight: "800", letterSpacing: "0.5px" }}>
                    ✓ SELECTED
                  </div>
                )}
              </div>

              <div style={{ fontWeight: "800", fontSize: "18px", color: "var(--text-primary)", marginBottom: "4px", fontFamily: "var(--font-display)" }}>{exam.name}</div>
              <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.4" }}>{exam.fullName}</div>

              {/* Tiers */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                {Object.values(exam.tiers).map(tier => (
                  <span key={tier.name} style={{
                    fontSize: "11px", fontWeight: "700", padding: "3px 10px", borderRadius: "12px",
                    background: exam.color + "22", color: exam.color, border: `1px solid ${exam.color}44`
                  }}>
                    {tier.name}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{topics.length} topics</span>
                <span style={{ fontSize: "12px", fontWeight: "700", color: exam.color }}>{pct}% done</span>
              </div>

              <div style={{ height: "6px", background: "var(--bg-secondary)", borderRadius: "3px" }}>
                <div style={{ height: "100%", width: `${pct}%`, background: exam.color, borderRadius: "3px", transition: "width 0.4s" }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* All exams detail */}
      {selected && (
        <div style={{ marginTop: "32px", background: "var(--card-bg)", borderRadius: "16px", padding: "24px", border: "1px solid var(--border)" }}>
          <h3 style={{ fontWeight: "800", color: "var(--text-primary)", margin: "0 0 20px", fontSize: "18px" }}>
            {EXAMS[selected].icon} {EXAMS[selected].name} — Syllabus Overview
          </h3>
          {Object.entries(EXAMS[selected].tiers).map(([tierId, tier]) => (
            <div key={tierId} style={{ marginBottom: "20px" }}>
              <div style={{ fontWeight: "800", fontSize: "15px", color: EXAMS[selected].color, marginBottom: "12px", borderBottom: `2px solid ${EXAMS[selected].color}33`, paddingBottom: "8px" }}>
                {tier.name}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "12px" }}>
                {Object.entries(tier.subjects).map(([subId, sub]) => {
                  const done = sub.topics.filter(t => progress[`${selected}__${tierId}__${subId}__${t}`]).length;
                  return (
                    <div key={subId} style={{ background: "var(--bg-secondary)", borderRadius: "10px", padding: "14px" }}>
                      <div style={{ fontWeight: "700", fontSize: "13px", color: "var(--text-primary)", marginBottom: "6px" }}>{sub.name}</div>
                      <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "8px" }}>{done}/{sub.topics.length} topics</div>
                      <div style={{ height: "4px", background: "var(--border)", borderRadius: "2px" }}>
                        <div style={{ height: "100%", width: `${sub.topics.length ? Math.round((done / sub.topics.length) * 100) : 0}%`, background: EXAMS[selected].color, borderRadius: "2px" }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}