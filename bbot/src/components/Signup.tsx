import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Input, Button } from "@/components/ui";
import { Form } from "antd";

function Signup({ host }) {
  const [redirect, setRedirect] = useState(false);

  console.log("Registration  Rendered....");

  async function submit() {
    const resp = await fetch(`${host}signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const res = await resp.json();
    if (res.resp.includes("success")) {
      console.log("signup success");
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to="/login" />;
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
        <Form.Item
          name="cpassword"
          className="text-foreground"
          rules={[{ required: true, message: "Please repeat your Password!!" }]}
        >
          <div>Confirm your password</div>
          <Input allowClear className="border border-foreground" />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit">Sign Up</Button>
        </Form.Item>

        <Form.Item className="text-foreground">
          <Link to="/login">
            <span>I have an account: </span>
            <Button
              variant="outline"
              size="sm"
              className="border border-foreground "
            >
              login
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Signup;
