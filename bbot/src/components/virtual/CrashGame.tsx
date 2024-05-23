import PlayRoom from "./PlayRoom";
import ChatRoom from "./ChatRoom";
import { Divider } from "antd";
import { signal } from "@preact/signals";


const players = signal([]);

const CrashGame = () => {
  return <div className="flex bg-[#7b7d7a] ">
    <PlayRoom playeers={players} />

    <Divider type="vertical" className="h-screen bg-black" />

    <ChatRoom players={players} />
  </div>
}

export default CrashGame;

