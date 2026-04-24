// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { getUsers, saveUsers, getCurrentUser, setCurrentUser, clearCurrentUser, updateStreak } from "../utils/storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const u = getCurrentUser();
    if (u) { setUser(u); updateStreak(u.username); }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    const users = getUsers();
    const found = users[username];
    if (!found) return { success: false, error: "User not found. Please sign up." };
    if (found.password !== password) return { success: false, error: "Incorrect password." };
    const userData = { username, name: found.name };
    setCurrentUser(userData);
    setUser(userData);
    updateStreak(username);
    return { success: true };
  };

  const signup = (username, name, password) => {
    const users = getUsers();
    if (users[username]) return { success: false, error: "Username already taken." };
    users[username] = { name, password };
    saveUsers(users);
    const userData = { username, name };
    setCurrentUser(userData);
    setUser(userData);
    return { success: true };
  };

  const logout = () => {
    clearCurrentUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);