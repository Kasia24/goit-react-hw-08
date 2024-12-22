import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { AppBar } from "../components/AppBar";
import { TasksPage } from "../pages/Tasks";
import { NotFound } from "../pages/NotFound";
import { LoginPage } from "../pages/Login";
import { RegisterPage } from "../pages/Register";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/slices/user";

const Layout = () => (
  <>
    <AppBar />
    <Outlet />
  </>
);

const Home = () => {
  const user = useSelector(selectCurrentUser);

  return user ? <Navigate to="/tasks" /> : <Navigate to="/login" />;
};

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Layout />}>
        <Route exact path="" element={<Home />} />
        <Route exact path="login" element={<LoginPage />} />

        <Route exact path="register" element={<RegisterPage />} />

        <Route
          path="tasks"
          element={
            <PrivateRoute redirectTo="/login">
              <TasksPage />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
