import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { token } = useSelector((state) => state.auth); // Sprawdzamy, czy użytkownik jest zalogowany

  return (
    <div>
      <h1>Welcome to the Contacts App</h1>

      {/* Jeśli użytkownik jest zalogowany */}
      {token ? (
        <div>
          <p>Welcome back! You can manage your contacts here.</p>
          <Link to="/contacts">Go to Contacts</Link>
        </div>
      ) : (
        // Jeśli użytkownik nie jest zalogowany
        <div>
          <p>To manage your contacts, please log in or register.</p>
          <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
