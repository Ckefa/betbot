import "./Login.css";
import React, { useState, useEffect } from "react";
import { Navigate, redirect } from "react-router-dom";

function Login() {
  const [mail, setMail] = useState("");
  const [passkey, setPass] = useState("");
  const [redirect, setRedirect] = useState(false);
  const host = "/";

  async function submit() {
    const auth = await fetch(`${host}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify({ email: mail, pass1: passkey }),
    });

    const resp = await auth.json();
    console.log(resp);
    fetch("http://localhost/status")
      .then((resp) => resp.json())
      .then((resp) => console.log(resp));

    if (resp === "login success") {
      console.log(resp);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to="/vfl" />;
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
  }

  return (
    <div>
      <div className="logms">Login to save your progress</div>
      <div className="logcard">
        <div className="item">
          <span> Email</span>
          <input onChange={(e) => setMail(e.target.value)} />
        </div>
        <div className="item">
          <span>Password</span>
          <input onChange={(e) => setPass(e.target.value)} />
        </div>
        <button onClick={submit}>Login</button>
      </div>
    </div>
  );
}

export default Login;
