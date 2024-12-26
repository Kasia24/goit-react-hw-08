import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Box, Button, Typography, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const RegisterPage = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters long")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await fetch(
        "https://connections-api.goit.global/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to register. Please try again.");
      }

      toast.success("Registration successful! Please log in.");
      navigate("/login"); // Przekierowanie do strony logowania
    } catch (error) {
      toast.error("Registration failed. Email may already be in use.");
      setFieldError("email", "Email already in use or invalid");
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
        Create Your Account
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
                name="name"
                as={TextField}
                label="Name"
                fullWidth
                variant="outlined"
                helperText={<ErrorMessage name="name" />}
                error={<ErrorMessage name="name" /> ? true : false}
              />
            </Box>
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
              {isSubmitting ? "Creating Account..." : "Sign Up"}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default RegisterPage;
