import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate(); // Hook do nawigacji
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Prosta logika sprawdzania danych logowania
    if (username === "user" && password === "password") {
      // Zapisujemy token w localStorage
      localStorage.setItem("authToken", "some-auth-token");
      toast.success("Login successful!");

      // Przekierowujemy użytkownika do strony TaskPage po zalogowaniu
      navigate("/tasks");
    } else {
      toast.error("Invalid username or password.");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Login
        </Button>
      </form>
    </Box>
  );
};

export default LoginPage;
