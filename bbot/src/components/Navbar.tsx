import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Sheet, SheetContent, SheetTrigger } from "@/components/ui";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { MenuIcon, User } from "lucide-react";
// import { logo } from "../assets";

function Navbar({ host, user, setBal }) {
  console.log("Navbar rendered...", user.bal);

  const [theme, setTheme] = useState<boolean>(true);

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

  const update = (data) => {
    console.log("this is the data", data);
    if (data.name) {
      user.name = data.name;
      user.bal = data.balance;
      setBal(user.bal);
      //console.log(user);
    } else {
      //user.name = "clinton";
      //user.bal = 1234.56;
      //(user.bal);
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
        setBal(null);
      });

  const menuItems = [
    { to: "/", text: "Home" },
    { to: "/vfl", text: "virtual" },
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
                  <a href={item.to}>{item.text}</a>
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
        <User className="" />
        <Button variant="ghost" onClick={changeTheme}>
          {theme ? <MoonIcon /> : <SunIcon />}
        </Button>
      </div>
    </div>
  );
}
export default Navbar;
