// src/components/Strategy/StrategyPage.js
import React, { useState } from "react";
import { EXAMS } from "../../data/examData";

const LEVELS = ["Beginner", "Intermediate", "Advanced"];

function generatePlan(exam, days, level, hoursPerDay) {
  if (!exam || !days) return null;
  const ex = EXAMS[exam];
  const subjects = [];
  Object.entries(ex.tiers).forEach(([tierId, tier]) => {
    Object.entries(tier.subjects).forEach(([subId, sub]) => {
      subjects.push({ name: sub.name, tier: tier.name, topics: sub.topics.length });
    });
  });

  const totalTopics = subjects.reduce((a, s) => a + s.topics, 0);
  const totalHours = days * hoursPerDay;
  const phases = [];

  if (days <= 7) {
    // Crash course
    phases.push({
      phase: "📌 Phase 1: Rapid Revision",
      duration: `${days} days`,
      tasks: subjects.slice(0, Math.ceil(subjects.length / 2)).map(s => `Focus on high-weightage topics: ${s.name} (${s.tier})`)
    });
  } else if (days <= 30) {
    const p1 = Math.floor(days * 0.5);
    const p2 = Math.floor(days * 0.3);
    const p3 = days - p1 - p2;
    phases.push({
      phase: "📘 Phase 1: Foundation Building",
      duration: `${p1} days`,
      tasks: subjects.slice(0, Math.ceil(subjects.length * 0.6)).map(s => `Study: ${s.name} (${s.tier}) — ${Math.ceil(s.topics * 0.7)} topics`)
    });
    phases.push({
      phase: "📗 Phase 2: Practice & Revision",
      duration: `${p2} days`,
      tasks: subjects.map(s => `Practice: ${s.name} — solve previous year questions`)
    });
    phases.push({
      phase: "📕 Phase 3: Mock Tests & Weak Areas",
      duration: `${p3} days`,
      tasks: ["Take full mock tests daily", "Revise weak topics", "Time management practice", "Current affairs revision"]
    });
  } else {
    const p1 = Math.floor(days * 0.4);
    const p2 = Math.floor(days * 0.3);
    const p3 = Math.floor(days * 0.2);
    const p4 = days - p1 - p2 - p3;
    phases.push({
      phase: "📘 Phase 1: Concept Clarity",
      duration: `${p1} days`,
      tasks: subjects.slice(0, Math.ceil(subjects.length * 0.5)).map(s => `Deep study: ${s.name} (${s.tier}) — all ${s.topics} topics`)
    });
    phases.push({
      phase: "📗 Phase 2: Complete Syllabus",
      duration: `${p2} days`,
      tasks: subjects.slice(Math.ceil(subjects.length * 0.5)).map(s => `Complete: ${s.name} (${s.tier}) — all ${s.topics} topics`)
    });
    phases.push({
      phase: "📙 Phase 3: Practice & Mock Tests",
      duration: `${p3} days`,
      tasks: ["Sectional mock tests", "Previous year papers", "Identify and fix weak areas", "Speed & accuracy drills"]
    });
    phases.push({
      phase: "📕 Phase 4: Final Revision",
      duration: `${p4} days`,
      tasks: ["Full mock tests daily", "Short notes revision", "Current affairs sprint", "Mental preparation", "Exam day planning"]
    });
  }

  const topicsPerDay = Math.ceil(totalTopics / days);
  const hoursPerSubject = (totalHours / subjects.length).toFixed(1);

  return { phases, stats: { totalTopics, topicsPerDay, hoursPerSubject, totalHours } };
}

export default function StrategyPage() {
  const [form, setForm] = useState({ exam: "", days: "", level: "Intermediate", hoursPerDay: "4" });
  const [plan, setPlan] = useState(null);

  const generate = () => {
    const result = generatePlan(form.exam, parseInt(form.days), form.level, parseInt(form.hoursPerDay));
    setPlan(result);
  };

  const exam = form.exam ? EXAMS[form.exam] : null;

  return (
    <div>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: "800", color: "var(--text-primary)", margin: 0, fontFamily: "var(--font-display)" }}>🎯 Strategy Generator</h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "6px" }}>Get a personalized study plan based on your timeline</p>
      </div>

      {/* Form */}
      <div style={{ background: "var(--card-bg)", borderRadius: "16px", padding: "28px", border: "1px solid var(--border)", marginBottom: "28px" }}>
        <h3 style={{ margin: "0 0 20px", fontWeight: "800", color: "var(--text-primary)" }}>Configure Your Plan</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px", marginBottom: "20px" }}>
          <div>
            <label style={labelS}>Select Exam *</label>
            <select style={inputS} value={form.exam} onChange={e => setForm(f => ({ ...f, exam: e.target.value }))}>
              <option value="">Choose exam...</option>
              {Object.values(EXAMS).map(ex => <option key={ex.id} value={ex.id}>{ex.icon} {ex.name}</option>)}
            </select>
          </div>
          <div>
            <label style={labelS}>Days Until Exam *</label>
            <input style={inputS} type="number" min="1" max="365" placeholder="e.g. 60" value={form.days} onChange={e => setForm(f => ({ ...f, days: e.target.value }))} />
          </div>
          <div>
            <label style={labelS}>Your Level</label>
            <select style={inputS} value={form.level} onChange={e => setForm(f => ({ ...f, level: e.target.value }))}>
              {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label style={labelS}>Hours Per Day</label>
            <input style={inputS} type="number" min="1" max="16" value={form.hoursPerDay} onChange={e => setForm(f => ({ ...f, hoursPerDay: e.target.value }))} />
          </div>
        </div>

        <button onClick={generate} disabled={!form.exam || !form.days} style={{
          background: form.exam && form.days ? "var(--accent)" : "var(--bg-secondary)",
          color: form.exam && form.days ? "#fff" : "var(--text-muted)",
          border: "none", borderRadius: "12px", padding: "12px 28px", fontWeight: "800", fontSize: "15px",
          cursor: form.exam && form.days ? "pointer" : "not-allowed", transition: "all 0.2s"
        }}>
          🚀 Generate Strategy
        </button>
      </div>

      {/* Plan Output */}
      {plan && exam && (
        <div>
          {/* Summary */}
          <div style={{ background: `linear-gradient(135deg, ${exam.color}22, var(--card-bg))`, borderRadius: "16px", padding: "24px", border: `1px solid ${exam.color}44`, marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <span style={{ fontSize: "36px" }}>{exam.icon}</span>
              <div>
                <h2 style={{ margin: 0, fontWeight: "800", color: "var(--text-primary)", fontFamily: "var(--font-display)" }}>{exam.name} Study Plan</h2>
                <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "14px" }}>{form.days} days • {form.level} level • {form.hoursPerDay} hrs/day</p>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px" }}>
              {[
                { label: "Total Topics", value: plan.stats.totalTopics, icon: "📚" },
                { label: "Topics/Day", value: plan.stats.topicsPerDay, icon: "📅" },
                { label: "Total Hours", value: plan.stats.totalHours, icon: "⏰" },
                { label: "Hrs/Subject", value: plan.stats.hoursPerSubject, icon: "📖" },
              ].map(s => (
                <div key={s.label} style={{ background: "var(--card-bg)", borderRadius: "10px", padding: "14px", textAlign: "center", border: "1px solid var(--border)" }}>
                  <div style={{ fontSize: "20px" }}>{s.icon}</div>
                  <div style={{ fontWeight: "800", fontSize: "20px", color: exam.color, fontFamily: "var(--font-display)" }}>{s.value}</div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "600" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Phases */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {plan.phases.map((phase, i) => (
              <div key={i} style={{ background: "var(--card-bg)", borderRadius: "14px", border: "1px solid var(--border)", overflow: "hidden" }}>
                <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", background: `${exam.color}11`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ margin: 0, fontWeight: "800", color: "var(--text-primary)", fontSize: "15px" }}>{phase.phase}</h3>
                  <span style={{ background: exam.color + "22", color: exam.color, padding: "4px 12px", borderRadius: "12px", fontSize: "12px", fontWeight: "700" }}>{phase.duration}</span>
                </div>
                <div style={{ padding: "16px 20px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {phase.tasks.slice(0, 8).map((task, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: exam.color, marginTop: "7px", flexShrink: 0 }} />
                        <span style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.5" }}>{task}</span>
                      </div>
                    ))}
                    {phase.tasks.length > 8 && (
                      <div style={{ fontSize: "12px", color: "var(--text-muted)", marginLeft: "16px" }}>+{phase.tasks.length - 8} more tasks...</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Daily Schedule Template */}
          <div style={{ marginTop: "20px", background: "var(--card-bg)", borderRadius: "14px", padding: "24px", border: "1px solid var(--border)" }}>
            <h3 style={{ margin: "0 0 16px", fontWeight: "800", color: "var(--text-primary)" }}>⏰ Suggested Daily Schedule</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                { time: "6:00 AM - 7:00 AM", task: "Morning Revision — Review yesterday's notes" },
                { time: `7:30 AM - ${7 + Math.floor(parseInt(form.hoursPerDay) / 2)}:30 AM`, task: "New Topic Study — Focus on difficult subjects" },
                { time: "1:00 PM - 2:00 PM", task: "Practice Questions — Solve MCQs on studied topics" },
                { time: "4:00 PM - 5:00 PM", task: "Current Affairs & GK — Read newspapers/digest" },
                { time: "7:00 PM - 9:00 PM", task: "Mock Test / Previous Papers — Timed practice" },
                { time: "9:00 PM - 9:30 PM", task: "Daily Notes Update — Write key points & formulas" },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", gap: "16px", padding: "10px 14px", background: "var(--bg-secondary)", borderRadius: "8px" }}>
                  <span style={{ fontSize: "12px", fontWeight: "700", color: exam.color, minWidth: "140px", flexShrink: 0 }}>{s.time}</span>
                  <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{s.task}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const labelS = { display: "block", marginBottom: "6px", fontSize: "12px", fontWeight: "700", color: "var(--text-secondary)", letterSpacing: "0.3px" };
const inputS = { width: "100%", padding: "10px 12px", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "14px", color: "var(--text-primary)", outline: "none", boxSizing: "border-box" };