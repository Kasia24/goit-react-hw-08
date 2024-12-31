import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Przykładowe wywołanie API do logowania
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // Wysyłanie email i password
      });

      if (!response.ok) {
        throw new Error("Nieprawidłowy email lub hasło.");
      }

      const data = await response.json();
      localStorage.setItem("authToken", data.token); // Zapis tokenu
      toast.success("Zalogowano pomyślnie!");
      navigate("/contacts"); // Przekierowanie po logowaniu
    } catch (error) {
      toast.error(error.message || "Wystąpił błąd logowania.");
    }
  };

  return (
    <div>
      <h1>Logowanie</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Hasło:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Zaloguj</button>
      </form>
    </div>
  );
};

export default LoginPage;
