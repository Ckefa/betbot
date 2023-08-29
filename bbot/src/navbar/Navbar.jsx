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
    { to: "/vfl", text: "Virtual League" },
    { to: "/bets", text: "My Bets" },
  ];

  return (
    <nav className="flex justify-between items-center text-white">
      <img alt="BetBot" src={logo} className="h-12 w-18" />

      <ul className="flex gap-[2vw] justify-end">
        {menuItems.map((item, index) => (
          <li
            className="text-[2vw] hover:bg-white hover:rounded-[2vw] hover:text-black"
            key={index}
          >
            <Link to={item.to}>{item.text}</Link>
          </li>
        ))}

        <li key="6" className="">
          {user.name && (
            <div className="flex items-center justify-around w-[30vw] text-orange-400">
              <Button className="bg-white" onClick={logout}>
                Log Out
              </Button>
              <UserOutlined />
              <div className="text-[2vw]">
                {user.name}: {user.bal.toFixed(2)}
              </div>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;
