import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  Button,
  Sheet,
  SheetContent,
  SheetTrigger,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { MenuIcon, User as UserIcn } from "lucide-react";
import axios from "axios";
import User from "@/lib/user";

import CONTEXT from "@/lib/context.js";

type respD = {
  name: string | null;
  bal: number;
  user: User;
};

// interface NavbarProps {
//   count: { value: number };
// }


function Navbar() {
  const [theme, setTheme] = useState<boolean>(true);
  const [cust, setCust] = useState<string>('');
  const [cbal, setCbal] = useState<number>(0);
  const { host, port, user } = useContext(CONTEXT);

  console.log("Navbar rendered...");

  const changeTheme = () => {
    const app = document.querySelector(".app");
    app?.classList.toggle("dark");
    setTheme((prev) => !prev);
  };

  const getData = async () => {
    try {
      const resp = await axios.get<{ msg: string; data: respD }>(`${host}:${port}/status`);
      const data = resp.data.data;

      console.log(data);

      if (resp.data.msg.toLowerCase() === 'ok') update(data);
    } catch (error) {
      console.error("Error getting data:", error);
    }
  }

  useEffect(() => {
    getData();
    console.log(user);
  }, []);

  const update = (data: respD) => {
    if (data.name && user) {
      user.name = data.name;
      user.bal = data.bal;
      setCust(user.name);
      setCbal(user.bal);
      console.log(user);
    } else if (user) {
      user.name = "clinton";
      user.bal = 1234.56;
      console.log("Error getting user details.");
    }
  };

  const logout = () =>
    axios.get(`${host}:${port}/logout`)
      .then((resp) => {
        console.log(resp.data);
        if (user) {
          user.bal = null;
          user.name = null;
        }
      });

  const menuItems = [
    { to: "/", text: "Home" },
    { to: "/vfl", text: "virtual" },
    { to: "/crash", text: "CrashGame" },
    { to: "/bets", text: "My Bets" },
  ];

  return (
    <div className="flex items-center justify-between">
      <Sheet>
        <SheetTrigger>
          <MenuIcon className="md:hidden" />
        </SheetTrigger>

        <SheetContent side="left">
          <nav>
            <ul className="flex flex-col gap-4 items-center">
              {menuItems.map((item) => (
                <li key={item.text}>
                  <Button variant="ghost">
                    <Link to={item.to}>{item.text}</Link>
                  </Button>
                </li>
              ))}
              <li className="">
                <Button>
                  <Link to={"/signup"}>join now</Link>
                </Button>
              </li>
            </ul>
          </nav>
        </SheetContent>
      </Sheet>


      <div className="font-bold">BETBOT</div>
      <nav className="hidden md:flex">
        <ul className="flex gap-4 items-center">
          {menuItems.map((item) => (
            <li key={item.text}>
              <Link to={item.to}>{item.text}</Link>
            </li>
          ))}
          <li className="">
            <Button>
              <Link to={"/signup"}>join now</Link>
            </Button>
          </li>
        </ul>
      </nav>
      <div className="flex gap-4 items-center pr-8">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <UserIcn />
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>my account</DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem>name: {cust}</DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>bal: {cbal}</DropdownMenuItem>

            <DropdownMenuItem>
              <Button className="w-full h-5" onClick={logout}>
                log out
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" onClick={changeTheme}>
          {theme ? <MoonIcon /> : <SunIcon />}
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
