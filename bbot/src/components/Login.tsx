import { useContext, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { Input, Button } from "@/components/ui";
import { Form } from "antd";
import CONTEXT from "@/lib/context";
import axios from "axios";

type subD = {
  name: string | null;
  password: string | null;
};

function Login() {
  const [redirect, setRedirect] = useState(false);

  const { host, port } = useContext(CONTEXT);

  console.log("Login Rendered......");

  const userLogin = async (data: subD) => {
    const req = await axios.post(`${host}:${port}/login`, data);
    const resp = req.data;

    console.log(resp);

    if (resp.msg === 'ok') {
      setRedirect(!redirect);
    }
  };

  if (redirect) {
    return <Navigate to="/vfl" />;
  }


  return (
    <div className="min-h-[80vh] flex">
      <Form
        layout="vertical"
        onFinish={userLogin}
        className="my-auto flex flex-col items-center w-[40vw] mx-auto gap-4 
      rounded-2xl border border-foreground  shadow-2xl text-foreground"
      >
        <div className="mt-10 text-2xl">Login to place your bets.</div>


        <div>
          <div>Email</div>
          <Form.Item
            name="email"
            className="text-foreground"
            rules={[{ required: true, message: "Please fill your email!!." }]}
          >
            <Input className="border border-foreground" />
          </Form.Item>
        </div>


        <div>
          <div>Password</div>
          <Form.Item
            name="passwd"
            className="text-foreground"
            rules={[{ required: true, message: "Please fill your Password!!" }]}
          >
            <Input className="border border-foreground" />
          </Form.Item>
          <Form.Item>
            <Button type="submit">Login</Button>
          </Form.Item>
        </div>

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
