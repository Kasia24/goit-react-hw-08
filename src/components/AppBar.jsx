import { classed } from "@tw-classed/react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectCurrentUser } from "../redux/slices/user";
import { logoutUser } from "../redux/operations/user";

export const AppBar = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  const active = ({ isActive }) => (isActive ? "underline" : "");

  return (
    <Bar>
      <Nav>
        {user ? (
          <Button className="hoverable" type="button" onClick={logout}>
            Logout
          </Button>
        ) : (
          <>
            <LinkButton to="/tasks" className={active}>
              Tasks
            </LinkButton>
            <LinkButton to="/login" className={active}>
              Login
            </LinkButton>
            <LinkButton to="/register" className={active}>
              Register
            </LinkButton>
          </>
        )}
      </Nav>
    </Bar>
  );
};

const Bar = classed.header("w-screen p-4 bg-indigo-400 flex justify-end");

const Nav = classed.nav("self-end flex gap-4");

const Button = classed.button("py-2 px-4  bg-red-500 text-white");

const LinkButton = classed(NavLink, "py-2 px-4 bg-slate-200 bold");
