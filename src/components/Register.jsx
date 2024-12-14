import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const Register = () => {
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        // Logika rejestracji
      }}
    >
      <Form>
        <Field name="username" />
        <ErrorMessage name="username" />
        <Field name="password" type="password" />
        <ErrorMessage name="password" />
        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
};

export default Register;
