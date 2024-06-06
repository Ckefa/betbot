import PlayRoom from "./PlayRoom";
import ChatRoom from "./ChatRoom";
import { Divider } from "antd";



const CrashGame = () => {
  return <div className="flex bg-[#7b7d7a] ">
    <PlayRoom />

    <Divider type="vertical" className="h-screen bg-black" />

    <ChatRoom />
  </div>
}

export default CrashGame;

