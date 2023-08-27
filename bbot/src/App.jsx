import Navbar from "./navbar/Navbar";
import Home from "./home/Home";
import Login from "./login/Login";
import Signup from "./login/Signup";
import Vfl from "./virtual/Vfl";
import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import { useState } from "react";

class Customer {
  constructor(name = null, bal = null) {
    this.name = name;
    this.bal = bal;
  }

  checkBalance() {
    console.log(this.name, this.bal);
  }
}

function App() {
  const [user, setUser] = useState(new Customer());
  const { Header, Content } = Layout;

  console.log("APlication rendered.");

  return (
    <Layout className="h-screen">
      <Header className="w-screen">
        <Navbar user={user} setUser={setUser} />
      </Header>

      <Content>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/vfl" element={<Vfl user={user} setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;
