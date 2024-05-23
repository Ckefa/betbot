import { Routes, Route } from "react-router-dom";


import { Navbar, Home, Login, Signup, Vfl, CrashGame } from "@/components";
import CONTEXT from "./lib/context";
import { Signal, effect, useSignal } from "@preact/signals";
import { useEffect } from "react";


class User {
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

const count = new Signal({ test: "clinton" });

const contexts = {
  host: "http://127.0.0.1",
  port: 7000,
}


function App() {
  console.log("App rendering......");


  const user = new User();
  contexts.user = user;


  return (
    <CONTEXT.Provider value={contexts}>
      <div className="app lg:container min-h-screen light bg-background text-foreground">
        <header className="h-8 pt-4">
          <Navbar count={count} />
        </header>

        <div className="mt-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/vfl" element={<Vfl />} />
            <Route path="/crash" element={<CrashGame />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </CONTEXT.Provider>
  );
}

export default App;
