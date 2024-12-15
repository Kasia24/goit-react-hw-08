import { useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginUser } from "../redux/LoginUser"; // funkcja do logowania
import { setCredentials } from "../redux/authSlice"; // akcja do zapisania tokenu w store
import { useNavigate } from "react-router-dom"; // do przekierowań

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Walidacja z Yup
  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required")
      .min(4, "Username must be at least 4 characters long"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
  });

  // Obsługa wysyłania formularza
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const { username, password } = values;
      const response = await loginUser({ username, password });

      // Zapisujemy token w Reduxie
      dispatch(setCredentials({ user: response.user, token: response.token }));

      // Przekierowanie do strony kontaktów po udanym logowaniu
      navigate("/contacts");
    } catch (error) {
      setSubmitting(false);
      setErrors({ general: "Invalid username or password" });
    }
  };

  return (
    <div>
      <h1>Login</h1>

      {/* Formularz logowania */}
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <div>
              <label htmlFor="username">Email</label>
              <Field
                type="text"
                id="username"
                name="username"
                placeholder="Enter your email"
              />
              <ErrorMessage name="username" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            {/* Wyświetlenie błędów logowania */}
            {errors.general && <div className="error">{errors.general}</div>}

            <div>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Log In"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
