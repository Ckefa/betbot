import { Link } from "react-router-dom";
import React, { useState, useEffect, Fragment } from "react";
import { Menu, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

function Navbar({ user, setUser }) {
  const host = "http://localhost/";

  console.log("Navbar rendered...");

  useEffect(() => {
    fetch(`${host}status`)
      .then((r) => r.json())
      .then((r) => update(r));
  }, []);

  const update = (data) => {
    console.log("this is the data", data);
    if (data.name) {
      setUser((prev) => ({
        ...prev,
        name: data.name,
        bal: data.balance,
      }));
      console.log(user);
    } else {
      setUser({ name: "clinton", bal: 1234.33 });
      console.log("error getting user details.");
    }
  };

  const logout = () =>
    fetch(`${host}/logout`)
      .then((resp) => resp.json())
      .then((resp) => console.log(resp));

  const menuItems = [
    { to: "/", text: "Home" },
    { to: "/vfl", text: "Virtual League" },
    { to: "/bets", text: "My Bets" },
  ];

  return (
    <nav className="text-white">
      <ul className="flex gap-[2vw]">
        {menuItems.map((item, index) => (
          <li
            className="text-[2vw] hover:bg-white hover:rounded-[2vw] hover:text-black"
            key={index}
          >
            <Link to={item.to}>{item.text}</Link>
          </li>
        ))}

        <li key="6" className="ml-auto">
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
