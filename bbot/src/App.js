import Navbar from "./navbar/Navbar";
import Home from "./home/Home";
import Login from "./login/Login";
import Signup from "./login/Signup.js";
import Vfl from "./virtual/Vfl";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/vfl" element={<Vfl />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
