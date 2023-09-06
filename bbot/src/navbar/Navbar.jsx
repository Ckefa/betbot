import { Link } from "react-router-dom";
import React, { useState, useEffect, Fragment } from "react";
import { Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { logo } from "../assets";

function Navbar({ host, user, setBal }) {
  console.log("Navbar rendered...", user.bal);

  useEffect(() => {
    fetch(`${host}status`)
      .then((r) => r.json())
      .then((r) => update(r));
  }, []);

  const update = (data) => {
    console.log("this is the data", data);
    if (data.name) {
      user.name = data.name;
      user.bal = data.balance;
      setBal(user.bal);
      //console.log(user);
    } else {
      //user.name = "clinton";
      //user.bal = 1234.56;
      //(user.bal);
      console.log("Errer getting user details.");
    }
  };

  const logout = () =>
    fetch(`${host}logout`)
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        user.bal = null;
        user.name = null;
        setBal(null);
      });

  const menuItems = [
    { to: "/", text: "Home" },
    { to: "/vfl", text: "virtual" },
    { to: "/bets", text: "My Bets" },
  ];

  return (
    <nav className="flex justify-between items-center text-[20px]">
      <div className=" font-bold">BETBOT</div>

      <ul className="flex gap-[var(--pgap)]">
        {menuItems.map((item) => (
          <li key={item.text}>
            <Link to={item.to}>{item.text}</Link>
          </li>
        ))}
        <li
          className="bg-[var(--important)] text-[var(--secondary)]
   rounded-[var(--rounded)] pl-[var(--pleft)] pr-[var(--pright)] text-center"
        >
          <Link to={"/signup"}>join now</Link>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;
