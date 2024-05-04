import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
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

type parVal = {
  host: string;
  user: {
    name: string | null;
    bal: number | null;
    checkBalance: () => void;
  };
};

type respD = {
  name: string | null;
  balance: number;
};

function Navbar({ host, user }: parVal) {
  const [theme, setTheme] = useState<boolean>(true);

  console.log("Navbar rendered...", user.bal);

  const changeTheme = () => {
    const app = document.querySelector(".app");
    app?.classList.toggle("dark");
    setTheme((prev) => !prev);
  };

  useEffect(() => {
    fetch(`${host}status`)
      .then((r) => r.json())
      .then((r) => update(r));
  }, []);

  const update = (data: respD) => {
    console.log("this is the data", data);
    if (data.name) {
      user.name = data.name;
      user.bal = data.balance;
    } else {
      user.name = "clinton";
      user.bal = 1234.56;
      console.log("Errer getting user details.");
    }
  };

  const logout = () =>
    fetch(`${host}logout`)
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
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

            <DropdownMenuItem>name: {user.name}</DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>bal: {user.bal}</DropdownMenuItem>

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
