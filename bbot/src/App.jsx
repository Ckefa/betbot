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
  const host = "/";

  console.log("APlication rendered.");

  return (
    <Layout className="min-h-screen bg-[var(--primary)] text-white">
      <header className="h-[2rem] ml-2 mr-4 bgu-[var(--secondary)] pt-4 pl-[var(--pleft)] pr-[var(--pright)]">
        <Navbar host={host} user={user} bal={bal} setBal={setBal} />
      </header>

      <Content className="mt-8">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            path="/login"
            element={<Login host={host} setBal={setBal} />}
          />
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
