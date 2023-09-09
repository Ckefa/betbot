import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Form, Input, Button } from "@/components/ui";

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
    <Form
      layout="vertical"
      onFinish={submit}
      className="flex flex-col items-center w-[40vw] mx-auto 
      mt-10 rounded-2xl border border-gray-400 shadow-2xl"
    >
      <div className="mt-4 text-2xl m-4">
        Please fill in the details below to Register.
      </div>
      <Form.Item
        label="Email"
        name="email"
        className="mt-4"
        rules={[{ required: true, message: "Please fill your email!!." }]}
      >
        <Input allowClear />
      </Form.Item>
      <Form.Item
        label="Password"
        name="pass1"
        className=""
        rules={[{ required: true, message: "Please fill your Password!!" }]}
      >
        <Input.Password allowClear />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="pass2"
        className=""
        rules={[{ required: true, message: "Please confirm your Password!!" }]}
      >
        <Input.Password allowClear />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" className="bg-lime-400 text-center">
          Register
        </Button>
      </Form.Item>
      <Form.Item>
        <Link to="/login" className="flex gap-4">
          <div>I have an account, </div>
          <Button className="bg-blue-300">sign in</Button>
        </Link>
      </Form.Item>
    </Form>
  );
}

export default Signup;
