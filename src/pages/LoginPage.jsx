import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Box, Button, Typography, TextField, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await fetch(
        "https://connections-api.goit.global/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();
      localStorage.setItem("authToken", data.token); // Zapisanie tokena do localStorage
      toast.success("Logged in successfully!");
      navigate("/contacts"); // Przekierowanie do strony kontaktów
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      setFieldError("email", "Invalid email or password");
      setFieldError("password", "Invalid email or password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      padding={4}
    >
      <Typography variant="h4" gutterBottom>
        Login to Your Account
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mb={3}>
              <Field
                name="email"
                as={TextField}
                label="Email"
                fullWidth
                variant="outlined"
                helperText={<ErrorMessage name="email" />}
                error={<ErrorMessage name="email" /> ? true : false}
              />
            </Box>
            <Box mb={3}>
              <Field
                name="password"
                as={TextField}
                type="password"
                label="Password"
                fullWidth
                variant="outlined"
                helperText={<ErrorMessage name="password" />}
                error={<ErrorMessage name="password" /> ? true : false}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Log In"}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default LoginPage;
