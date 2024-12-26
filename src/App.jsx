import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ContactsPage from "./pages/ContactsPage";
import PrivateRoute from "./components/PrivateRoute";
import TasksPage from "./TasksPage";

const App = () => {
  const isLoggedIn = !!localStorage.getItem("authToken"); // Sprawdza, czy użytkownik jest zalogowany (token w localStorage)

  return (
    <Router>
      {/* Komponent Header wyświetlany na wszystkich stronach */}
      <Header isLoggedIn={isLoggedIn} />

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
              <Route
                path="/tasks"
                element={isLoggedIn ? <TasksPage /> : <LoginPage />}
              />
              <ContactsPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
