// src/utils/storage.js

const PREFIX = "examPrep_";

export const storage = {
  get: (key) => {
    try {
      const val = localStorage.getItem(PREFIX + key);
      return val ? JSON.parse(val) : null;
    } catch { return null; }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch (e) { console.error(e); }
  },
  remove: (key) => localStorage.removeItem(PREFIX + key),
  clear: () => {
    Object.keys(localStorage)
      .filter(k => k.startsWith(PREFIX))
      .forEach(k => localStorage.removeItem(k));
  }
};

// Auth helpers
export const getUsers = () => storage.get("users") || {};
export const saveUsers = (users) => storage.set("users", users);
export const getCurrentUser = () => storage.get("currentUser");
export const setCurrentUser = (user) => storage.set("currentUser", user);
export const clearCurrentUser = () => storage.remove("currentUser");

// Progress helpers
export const getProgress = (username) => storage.get(`progress_${username}`) || {};
export const saveProgress = (username, progress) => storage.set(`progress_${username}`, progress);

// Notes helpers
export const getNotes = (username) => storage.get(`notes_${username}`) || [];
export const saveNotes = (username, notes) => storage.set(`notes_${username}`, notes);

// Streak helpers
export const getStreak = (username) => storage.get(`streak_${username}`) || { count: 0, lastDate: null, history: [] };
export const saveStreak = (username, streak) => storage.set(`streak_${username}`, streak);

export const updateStreak = (username) => {
  const streak = getStreak(username);
  const today = new Date().toISOString().split("T")[0];
  if (streak.lastDate === today) return streak;
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  const newCount = streak.lastDate === yesterday ? streak.count + 1 : 1;
  const updated = { count: newCount, lastDate: today, history: [...(streak.history || []).slice(-29), today] };
  saveStreak(username, updated);
  return updated;
};

// Selected exam
export const getSelectedExam = (username) => storage.get(`selectedExam_${username}`) || null;
export const saveSelectedExam = (username, examId) => storage.set(`selectedExam_${username}`, examId);