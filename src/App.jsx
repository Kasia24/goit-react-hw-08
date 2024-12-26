import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ContactsPage from "./pages/ContactsPage";
import PrivateRoute from "./components/PrivateRoute";
import TasksPage from "./components/TaskPage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("authToken")
  );

  // Funkcja do wylogowania, zmienia stan isLoggedIn
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Aktualizowanie stanu logowania, gdy zmienia się token w localStorage
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <Router>
      {/* Komponent Header wyświetlany na wszystkich stronach */}
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      {/* Toaster do wyświetlania powiadomień */}
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        {/* Publiczne ścieżki */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Prywatne ścieżki */}
        <Route
          path="/contacts"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <ContactsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <TasksPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
