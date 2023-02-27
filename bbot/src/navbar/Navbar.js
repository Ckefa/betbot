import "./Navbar.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
var balance = 0;

function Navbar() {
  const [status, setStatus] = useState(false);
  const [user, setUser] = useState("");
  const [bal, setBal] = useState("0");

  useEffect(() => {
    fetch("/status/")
      .then((r) => r.json())
      .then((r) => update(r));
  });

  const update = (data) => {
    console.log(data);
    if (data !== "Null") {
      setUser(data.name);
      setBal(data.balance);
      setStatus(true);
    }
  };

  balance = bal;

  return (
    <div className="navbar">
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/vfl">Virtual League</Link>
      </div>
      <div>
        <Link to="/login">Login</Link>
      </div>
      <div>
        <Link to="/signup">Sing up</Link>
      </div>
      <div>
        <Link to="/about">About</Link>
      </div>
      {status && (
        <div className="user">
          <div>{user}</div>
          <div>{bal}</div>
        </div>
      )}
    </div>
  );
}

export { balance };
export default Navbar;
