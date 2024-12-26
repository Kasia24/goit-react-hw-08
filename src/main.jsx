import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Główny komponent aplikacji
import "./index.css"; // Opcjonalnie, plik z ogólnymi stylami CSS

// Tworzymy root aplikacji, używając ReactDOM.createRoot (dla React 18+)
const root = ReactDOM.createRoot(document.getElementById("root"));

// Renderujemy aplikację w DOM
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
