import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Home.css"; // Add your styling here

const Home = () => {
  const { token, user } = useSelector((state) => state.auth); // Check user authentication

  return (
    <div className="home-container">
      <h1>Welcome to the Contacts App</h1>

      {token ? (
        <div>
          <p>{user ? `Welcome back, ${user.name}!` : "Welcome back!"}</p>
          <p>You can manage your contacts here.</p>
          <Link to="/contacts" className="btn">
            Go to Contacts
          </Link>
        </div>
      ) : (
        <div>
          <p>To manage your contacts, please log in or register.</p>
          <Link to="/login" className="btn">
            Login
          </Link>
          <Link to="/register" className="btn">
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
