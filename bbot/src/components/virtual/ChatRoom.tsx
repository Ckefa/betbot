import { Divider } from "antd";
import { Button } from "../ui";
import { useEffect, useState } from "react";
import Chat from "@/lib/Chat";

type betItem = {
  user: string;
  stake: number;
  odd: number;
  cashout: null | number | boolean;
  won: number | boolean;
}

const ChatRoom = () => {
  const [tab, setTab] = useState(0);
  const [chat, setChat] = useState<Chat | null>(null);
  const [players, setPlayers] = useState<betItem[]>([]);

  useEffect(() => {
    console.log("Chat Room Rendered");

    const opts = { setPlayers };
    const t_chat = new Chat(opts);
    setChat(t_chat);
    console.log(chat);
  }, []);

  return (
    <div className="bg-black w-[45vw]">
      <div className="grid grid-cols-3 gap-4">
        <Button variant={"secondary"} className="m-2" onClick={() => setTab(0)}>Players</Button>
        <Button variant={"secondary"} className="m-2" onClick={() => setTab(1)}>History </Button>
        <Button variant={"secondary"} className="m-2" onClick={() => setTab(2)}>Chats</Button>
      </div>

      <div className="m-2">
        {tab === 0 && (
          <div>
            <div className="flex gap-4">
              <span className="text-green-400">Online: {players.length}</span>
              <span className="text-yellow-500">Playing: {players.length}</span>
            </div>

            <div className="grid grid-cols-4 m-2 gap-4 font-semibold text-primary">
              <div>Username</div>
              <div>stake</div>
              <div>{"@"}</div>
              <div>Won</div>
            </div>
            <Divider className="m-0 bg-orange-400" />

            <div className="m-2">
              {players.map((item, index) => (
                <div key={index} className={`grid grid-cols-4 gap-4 ${item.cashout ? "text-green-500" : "text-red-500"}`}>
                  <div>{item.user}</div>
                  <div>{item.stake}</div>
                  <div>{item.odd}x</div>
                  <div>{item.won}</div>
                  <Divider className="m-0 bg-orange-400 w-[40vw]" />
                </div>
              ))}
            </div>
          </div>
        )}
        {tab === 1 && <div> History </div>}
        {tab === 2 && <div> Chats </div>}
      </div>
    </div>
  );
}

export default ChatRoom;
