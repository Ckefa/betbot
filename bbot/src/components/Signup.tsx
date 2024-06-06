import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Input, Button } from "@/components/ui";
import { Form } from "antd";
import axios from "axios";

import CONTEXT from "@/lib/context";

type subVal = {
  email: string;
  password: string;
  cpassword: string;
};

function Signup() {
  const [redirect, setRedirect] = useState(false);

  console.log("Registration Rendered...");

  const { host, port } = useContext(CONTEXT);

  const userSignup = async (values: subVal) => {
    try {
      const req = await axios.post(`${host}:${port}/signup`, values);
      const resp = req.data;

      console.log(resp);

      if (resp.msg === 'ok') {
        console.log("signup success");
        setRedirect(true);
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-[80vh] flex">
      <Form
        layout="vertical"
        onFinish={userSignup}
        className="my-auto flex flex-col items-center w-[40vw] mx-auto gap-2
      rounded-2xl border border-foreground shadow-2xl text-foreground"
      >
        <div className="mt-10 text-2xl">Login to place your bets.</div>

        <div>
          <div>Email</div>
          <Form.Item
            name="email"
            className="text-foreground"
            rules={[{ required: true, message: "Please fill your email!!" }]}
          >
            <Input className="border border-foreground" />
          </Form.Item>
        </div>

        <div>
          <div>Password</div>
          <Form.Item
            name="password"
            className="text-foreground"
            rules={[{ required: true, message: "Please fill your Password!!" }]}
          >
            <Input type="password" className="border border-foreground" />
          </Form.Item>
        </div>

        <div>
          <div>Confirm your password</div>
          <Form.Item
            name="cpassword"
            className="text-foreground"
            rules={[{ required: true, message: "Please repeat your Password!!" }]}
          >
            <Input type="password" className="border border-foreground" />
          </Form.Item>
        </div>

        <Form.Item>
          <Button type="submit">Sign Up</Button>
        </Form.Item>

        <Form.Item className="text-foreground">
          <Link to="/login">
            <span>I have an account: </span>
            <Button
              variant="outline"
              size="sm"
              className="border border-foreground"
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
