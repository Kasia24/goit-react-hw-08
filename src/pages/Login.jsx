import { classed } from "@tw-classed/react";
import { AuthForm } from "../components/AuthForm";
import { Link, Navigate } from "react-router-dom";
import { selectCurrentUser, selectIsLoading } from "..//redux/operations/user";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "..//redux/operations/user";

export const LoginPage = () => {
  const user = useSelector(selectCurrentUser);
  const isLoadingUser = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  const login = (event) => {
    const form = event.currentTarget;

    const { email, password } = form.elements;

    const credentials = {
      email: email.value,
      password: password.value,
    };

    console.log(credentials);
    dispatch(loginUser(credentials));
  };

  if (user) return <Navigate to="/tasks" />;

  return (
    <Layout>
      <Card>
        <Title>Login</Title>
        <AuthForm label="Login" onSubmit={login} disabled={isLoadingUser} />

        <p>
          Don't have an account? <Highlight to="/register">Register</Highlight>
        </p>
      </Card>
    </Layout>
  );
};

const Layout = classed.main("p-32 flex flex-col items-center");

const Card = classed.div(
  "w-full max-w-sm p-6 bg-indigo-300 rounded-lg shadow-md flex flex-col items-center"
);

const Title = classed.h2("py-4 text-4xl bold");

const Highlight = classed(Link, "hoverable", "bold underline text-blue-800");
