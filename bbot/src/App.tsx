import { Navbar, Home, Login, Signup, Vfl } from "@/components";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

const host = "http://localhost/";

class Customer {
  name: string | null;
  bal: number;

  constructor(name = null, bal = 0.0) {
    this.name = name;
    this.bal = bal;
  }

  checkBalance(): void {
    console.log(this.name, this.bal);
  }
}

function App() {
  const [user] = useState<Customer>(new Customer());
  const [bal, setBal] = useState(user.bal);

  useEffect(() => setBal(user.bal), [user.bal]);

  console.log("APlication rendering.....", bal);

  return (
    <div className="app lg:container min-h-screen light bg-background text-foreground">
      <header className="h-8 pt-4">
        <Navbar host={host} user={user} />
      </header>

      <div className="mt-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login host={host} />} />
          <Route path="/vfl" element={<Vfl host={host} user={user} />} />
          <Route path="/signup" element={<Signup host={host} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
