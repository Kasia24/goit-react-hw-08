import React from "react";
import { useNavigate } from "react-router-dom";

const TaskPage = ({ user }) => {
  const navigate = useNavigate();

  // Funkcja do obsługi wylogowania
  const handleLogout = () => {
    // Usuwamy token z localStorage (lub inne dane dotyczące logowania)
    localStorage.removeItem("token");

    // Przekierowanie użytkownika na stronę logowania po wylogowaniu
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Witaj, {user.username}!</h1>
      <p>Twój login: {user.username}</p>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => navigate("/tasks")}
          style={{
            padding: "10px 20px",
            margin: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Przejdź do zadań
        </button>
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            margin: "10px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Wyloguj się
        </button>
      </div>
    </div>
  );
};

export default TaskPage;
