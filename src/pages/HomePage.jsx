import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      textAlign="center"
      padding={4}
    >
      <Typography variant="h2" gutterBottom>
        Welcome to Phonebook App
      </Typography>
      <Typography variant="h5" color="textSecondary" gutterBottom>
        Manage your contacts securely and efficiently.
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        This is a simple yet powerful application designed to store and manage
        your personal contacts. Register now or log in to start using it.
      </Typography>
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/register"
          sx={{ marginRight: 2 }}
        >
          Get Started
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          component={Link}
          to="/login"
        >
          Log In
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
