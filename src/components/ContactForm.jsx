import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addContact } from "../api/api";
import toast from "react-hot-toast";
import { Button, TextField, Box } from "@mui/material";

// eslint-disable-next-line react/prop-types
const ContactForm = ({ onContactAdded }) => {
  const initialValues = {
    name: "",
    number: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters long"),
    number: Yup.string()
      .matches(/^\+?[0-9]{10,15}$/, "Invalid phone number")
      .required("Phone number is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await addContact(values);
      toast.success(`Contact "${response.data.name}" added successfully!`);
      onContactAdded(response.data); // Notify parent to update the contact list
      resetForm();
    } catch (error) {
      toast.error("Failed to add contact. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            maxWidth={400}
            margin="auto"
          >
            <Field
              name="name"
              as={TextField}
              label="Name"
              variant="outlined"
              fullWidth
              helperText={<ErrorMessage name="name" />}
              error={ErrorMessage.name}
            />
            <Field
              name="number"
              as={TextField}
              label="Phone Number"
              variant="outlined"
              fullWidth
              helperText={<ErrorMessage name="number" />}
              error={ErrorMessage.number}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              Add Contact
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
