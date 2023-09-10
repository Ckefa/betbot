import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { Input, Button } from "@/components/ui";
import { Form } from "antd";

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
    <div className="min-h-[80vh] flex">
      <Form
        layout="vertical"
        onFinish={submit}
        className="my-auto flex flex-col items-center w-[40vw] mx-auto gap-4 
      rounded-2xl border border-foreground  shadow-2xl text-foreground"
      >
        <div className="mt-10 text-2xl">Login to place your bets.</div>
        <Form.Item
          name="email"
          className="text-foreground"
          rules={[{ required: true, message: "Please fill your email!!." }]}
        >
          <div>Email</div>
          <Input allowClear className="border border-foreground" />
        </Form.Item>
        <Form.Item
          name="password"
          className="text-foreground"
          rules={[{ required: true, message: "Please fill your Password!!" }]}
        >
          <div>Password</div>
          <Input allowClear className="border border-foreground" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Login</Button>
        </Form.Item>

        <Form.Item className="text-foreground">
          <Link to="/signup">
            <span>I am a new member: </span>
            <Button
              variant="outline"
              size="sm"
              className="border border-foreground"
            >
              sign up
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
