import Navbar from "./navbar/Navbar";
import Home from "./home/Home";
import Login from "./login/Login";
import Signup from "./login/Signup";
import Vfl from "./virtual/Vfl";
import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import { useState } from "react";

class Customer {
  constructor(name = null, bal = 0.0) {
    this.name = name;
    this.bal = bal;
  }

  checkBalance() {
    console.log(this.name, this.bal);
  }
}

function App() {
  const [user, setUser] = useState(new Customer());
  const [bal, setBal] = useState(user.bal);
  const { Header, Content } = Layout;
  const host = "http://localhost/";

  console.log("APlication rendered.");

  return (
    <Layout className="h-screen">
      <Header className="w-screen">
        <Navbar host={host} user={user} bal={bal} setBal={setBal} />
      </Header>

      <Content>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login host={host} />} />
          <Route
            path="/vfl"
            element={<Vfl host={host} user={user} setBal={setBal} />}
          />
          <Route path="/signup" element={<Signup host={host} />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;
