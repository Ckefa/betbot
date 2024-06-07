import { createContext } from "react";
import User from "./user";

type cntxType = {
  host: string | null;
  port: number | null;
  user: User | null;
}


const appContext = {
  host: "18.207.139.230",
  port: 5055,
  user: new User(),
}

const CONTEXT = createContext<cntxType>(appContext);

export { appContext };
export default CONTEXT;
