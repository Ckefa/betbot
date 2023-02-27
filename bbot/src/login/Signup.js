import React, { useState } from "react";
import { Navigate } from "react-router-dom";

function Signup() {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function submit() {
    const resp = await fetch("/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify({
        email: mail,
        pass1: pass,
        pass2: pass2,
      }),
    });

    const res = await resp.json();
    if (res === "signup success") {
      console.log("signup success");
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to="/login" />;
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
      <div className="logms">Register using valid details</div>
      <div className="logcard">
        <div className="item">
          <span> Email</span>
          <input onChange={(e) => setMail(e.target.value)} />
        </div>
        <div className="item">
          <span>Password</span>
          <input onChange={(e) => setPass(e.target.value)} />
        </div>
        <div className="item">
          <span>Confirm Password</span>
          <input onChange={(e) => setPass2(e.target.value)} />
        </div>
        <button onClick={submit}>Submit</button>
      </div>
    </div>
  );
}

export default Signup;
