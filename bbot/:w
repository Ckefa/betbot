import { useState, useEffect } from "react";
import { Input, Button } from "@/components/ui";
import { Divider } from "antd";
import Client from "./Client.jsx";


class Account {
  constructor(bal = 0) {
    this.bal = bal;
  }

}

function CrashGame() {
  const [user, setUser] = useState();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState<string>();
  const [multiplier, setMult] = useState(1);
  const [round, setRound] = useState(4);
  const [showRound, setShowRound] = useState(false);
  const [showBust, setShowBust] = useState(false);
  const [account, setAccount] = useState();
  const [bet, setBet] = useState(0);
  const [stake, setStake] = useState(10);
  const [cashout, setCashout] = useState(2);
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    const client = new Client(setMessages);
    setUser(client);
    const sio = client.sio
    sio.on("message", msg => {
      setMessages(msg);
    });

    sio.on("multiplier", mult => setMult(mult));

    sio.on("busted", bust => {
      setMult(bust);
      setShowBust(true);
      updateAccount();

      setTimeout(() => startNextRound(), 3800);
    });

    sio.emit("update_messages");
    const account = new Account(100);
    setAccount(account);
  }, []);

  const placeBet = () => {
    console.log("placing bet 10");
    account.bal -= 10;
    setBet(10);
  }

  const updateAccount = () => {
    // setBal(0);
  };

  const startNextRound = () => {
    setShowRound(true);
    setTimeout(() => {
      setShowRound(false);
      setShowBust(false);
    }, 3800);

    console.log("aaaaaaaaaaaaaa");

    let count = 4;

    while (count > 0) {
      console.log(`next Round in ${count}`);
      count = count - 0.1;
      setRound(count);
      sleep(100);
    }


  };

  return <div className="">

    <div className="w-[50vw] h-screen bg-green-300 flex  flex-col items-center">
      <div className="font-bold text-[3vw]"> bal: {account?.bal} </div>

      <div id="multiplier" className="flex flex-col justify-center h-[30vh]">
        {showBust && <div className="font-bold text-red-600 color-red text-[2.5vw]"> Busted @ {multiplier}</div>}
        {showRound && <div className=""> Next Round IN {round}</div>}
        {!showBust && <div className="font-bold text-[5vw]"> {multiplier.toFixed(2)}X </div>}
      </div>

      <Divider />

      <div className="self-start m-4">
        <span className="font-bold">Cashier</span>

        <div className="flex gap-4">
          <div className="flex flex-col">
            <span>Amount</span>
            <Input placeholder="Amt" className="font-bold text-lg w-[8vw] bg-white" />
          </div>

          <div className="flex flex-col">
            <span>Auto Cashout</span>
            <Input placeholder="Auto" className="font-bold text-lg w-[8vw] bg-white" />
          </div>

          {bet < 1 &&
            <Button className="mt-6" onClick={() => placeBet()}>Bet</Button>
          }

          {bet > 1 &&
            <div className="bg-black p-2 rounded-lg" onClick={() => console.log("CAshout")}>
              <div className="text-white">Cash Out</div>
              <div className="font-bold text-[2vw] text-orange-300">{(bet * multiplier).toFixed(2)}</div>
            </div>
          }
        </div>

      </div>
    </div>

  </div>

}

export default CrashGame;

