import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "..//redux/operations/user";

export const PrivateRoute = ({ children, redirectTo }) => {
  const user = useSelector(selectCurrentUser);

  console.log({ user });

  if (user === null) return <Navigate to={redirectTo} replace />;

  return children ? children : <Outlet />;
};
