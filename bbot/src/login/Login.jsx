import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { Form, Input, Button } from "antd";

function Login({ host, setBal }) {
  const [redirect, setRedirect] = useState(false);

  console.log("Login Rendered......");

  const submit = (values) => {
    fetch(`${host}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        if (resp.resp.includes("success")) {
          setBal(null);
          setRedirect(!redirect);
        }
      });
  };

  if (redirect) {
    return <Navigate to="/vfl" />;
  }

  return (
    <Form
      layout="vertical"
      onFinish={submit}
      className="flex flex-col items-center w-[40vw] mx-auto 
      mt-10 rounded-2xl border border-gray-400 shadow-2xl"
    >
      <div className="mt-10 text-2xl">Login to place your bets.</div>
      <Form.Item
        label="Email"
        name="email"
        className="mt-10"
        rules={[{ required: true, message: "Please fill your email!!." }]}
      >
        <Input allowClear />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        className=""
        rules={[{ required: true, message: "Please fill your Password!!" }]}
      >
        <Input.Password allowClear />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" className="bg-blue-300">
          Login
        </Button>
      </Form.Item>
      <Form.Item>
        <Link to="/signup" className="flex gap-4">
          <div>I am a ew member, </div>
          <Button className="bg-lime-400">sign up</Button>
        </Link>
      </Form.Item>
    </Form>
  );
}

export default Login;
