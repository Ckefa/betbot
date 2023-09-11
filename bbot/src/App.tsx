import { Navbar, Home, Login, Signup, Vfl } from "@/components";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

const host = "http://localhost/";

class Customer {
  name: string | null;
  bal: number;

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

  console.log("APlication rendering.....");

  return (
    <div className="app container min-h-screen light bg-background text-foreground">
      <header className="h-8 pt-4">
        <Navbar host={host} user={user} bal={bal} setBal={setBal} />
      </header>

      <div className="mt-8">
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
      </div>
    </div>
  );
}

export default App;
