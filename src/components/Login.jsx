import { useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginUser } from "../redux/LoginUser"; // Redux async thunk for login
import { setCredentials } from "../redux/authSlice"; // Redux action to store user data
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required")
      .min(4, "Username must be at least 4 characters long"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const { username, password } = values;
      const response = await loginUser({ username, password });

      // Save token and user details in Redux store
      dispatch(setCredentials({ user: response.user, token: response.token }));

      // Redirect to contacts page on successful login
      navigate("/contacts");
    } catch (error) {
      setSubmitting(false);

      // Display server error or generic error message
      setErrors({
        general:
          error.response?.data?.message || "Invalid username or password",
      });
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>

      {/* Login Form */}
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field type="text" id="username" name="username" />
              <ErrorMessage name="username" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            {/* Display general login errors */}
            {errors.general && (
              <div className="error general-error">{errors.general}</div>
            )}

            <div className="form-group">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-submit"
              >
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
