import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register.jsx";
import Login from "./components/Login";
import Contacts from "./components/Contacts";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </Router>
  );
}

export default App;
