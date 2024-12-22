import { classed } from "@tw-classed/react";
import { AuthForm } from "../components/AuthForm";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, selectIsLoading } from "..//redux/operations/user";
import { registerUser } from "..//redux/operations/user";

export const RegisterPage = () => {
  const user = useSelector(selectCurrentUser);
  const isLoadingUser = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  const register = (event) => {
    const form = event.currentTarget;

    const { email, password } = form.elements;

    const credentials = {
      email: email.value,
      password: password.value,
    };

    console.log(credentials);
    dispatch(registerUser(credentials));
  };

  if (user) return <Navigate to="/tasks" />;

  return (
    <Layout>
      <Card>
        <Title>Register</Title>
        <AuthForm
          label="Register"
          onSubmit={register}
          disabled={isLoadingUser}
        />

        <p>
          Already have an account? <Highlight to="/login">Login</Highlight>
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
