import { createContext } from "react";
import User from "./user";

type contextType = {
  host: null | string;
  port: null | number;
  user: null | User;
}


const appContext = {
  host: "localhost",
  port: 5055,
  user: new User(),
}

const CONTEXT = createContext<contextType>(appContext);

export default CONTEXT;
