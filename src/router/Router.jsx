import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RegisterPage } from "../pages/Register";
import { LoginPage } from "../pages/Login";
import { PrivateRoute } from ".//PrivateRoute";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/contacts"
          element={<PrivateRoute redirectTo="/login"></PrivateRoute>}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
