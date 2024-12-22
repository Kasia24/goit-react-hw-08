import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/slices/user";

export const RegisterPage = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string().required("Imię jest wymagane"),
    email: Yup.string()
      .email("Nieprawidłowy email")
      .required("Email jest wymagany"),
    password: Yup.string()
      .min(6, "Hasło musi mieć co najmniej 6 znaków")
      .required("Hasło jest wymagane"),
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(registerUser(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <Field name="name" placeholder="Imię" />
        <ErrorMessage name="name" component="div" />

        <Field name="email" type="email" placeholder="Email" />
        <ErrorMessage name="email" component="div" />

        <Field name="password" type="password" placeholder="Hasło" />
        <ErrorMessage name="password" component="div" />

        <button type="submit">Zarejestruj</button>
      </Form>
    </Formik>
  );
};
