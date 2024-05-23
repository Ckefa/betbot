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
import { MenuIcon, User } from "lucide-react";
import axios from "axios";


import CONTEXT from "@/lib/context.js";
import Count from "./Count";


type respD = {
  name: string | null;
  bal: number;
};

function Navbar({ count }) {
  const [theme, setTheme] = useState<boolean>(true);
  const [cust, setCust] = useState('');
  const [cbal, setCbal] = useState(0);


  console.log("Navbar rendered...");
  const { host, port, user } = useContext(CONTEXT);


  const changeTheme = () => {
    const app = document.querySelector(".app");
    app?.classList.toggle("dark");
    setTheme((prev) => !prev);
  };

  const getData = async () => {
    const resp = await axios.get(`${host}:${port}/status`);
    const data = resp.data;


    console.log(data);

    if (data.msg.toLowerCase() === 'ok') update(data);
  }

  useEffect(() => {
    getData();
    console.log("Signaling user", "count", count.value);
    console.log(user);
  }, []);


  const update = (data: respD) => {
    if (data.name) {
      user.name = data.name;
      user.bal = data.bal;
      setCust(user.name);
      setCbal(user.bal);
      console.log(user);
    } else {
      user.name = "clinton";
      user.bal = 1234.56;
      console.log("Errer getting user details.");
    }
  };

  const logout = () =>
    axios.get(`${host}:${port}/logout`)
      .then((resp) => {
        console.log(resp.data);
        user.bal = null;
        user.name = null;
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

      <Count count={count} user={user} />

      <div className=" font-bold">BETBOT</div>
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
            <User />
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
