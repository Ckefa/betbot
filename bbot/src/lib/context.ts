import { createContext } from "react";
import User from "./user";

type contextType = {
  host: null | string;
  port: null | number;
  user: null | User;
}


const appContext = {
  host: "18.207.139.230",
  port: 5055,
  user: new User(),
}

const CONTEXT = createContext<contextType>(appContext);

export default CONTEXT;
