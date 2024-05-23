import { useState, useEffect } from "react";
import { Input, Button } from "@/components/ui";
import { Divider } from "antd";
import Client from "@/lib/Client";
import Account from "@/lib/Account";
import Chat from "@/lib/Chat";


const PlayRoom = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState<string>();
  const [multiplier, setMult] = useState(1);
  const [bust, setBust] = useState(1);
  const [round, setRound] = useState(4);
  const [showRound, setShowRound] = useState(false);
  const [showBust, setShowBust] = useState(false);
  const [account, setAccount] = useState<Account>();
  const [bet, setBet] = useState(0);
  const [cashed, setCashed] = useState(0);
  const [pending, setPending] = useState(false);
  const [stake, setStake] = useState(0);
  const [greenZone, setGreenZone] = useState(true);
  const [cashout, setCashout] = useState(0);

  useEffect(() => {
    console.log("Play room Rendered ...");


    const opts = { setBet, setCashed, setPending };

    const account = new Account(opts);
    setAccount(account);

    const client = new Client();
    const sio = client.sio;

    sio.on("multiplier", mult => setMult(mult));

    sio.on("busted", bust => {
      new Chat().resetPlayers();
      setGreenZone(false);
      setBust(bust);
      setMult(1);
      setShowBust(true);
      account.updateAccount();

      if (account.callBack != null) account.callBack();

      setTimeout(() => startNextRound(), 3800);
    });

    sio.emit("update_messages");
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (showRound) {
        if (round > 0.1) {
          setRound(prev => prev - 0.1);
        }
      } else {
        clearInterval(interval);
        setRound(4);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [round, showRound]);

  useEffect(() => {
    if (cashed > 0) {
      return;
    } else if (multiplier >= cashout && cashout > 1) {
      account?.cashierAction(bet, multiplier, showBust)
    }
  }, [multiplier]);

  const startNextRound = () => {
    // account?.activeBet = false;
    setShowRound(true);
    setTimeout(() => {
      setGreenZone(true);
      setShowRound(false);
      setShowBust(false);
    }, 3800);
  };

  return <div className="w-[50vw] h-screen flex  flex-col items-center" >
    <div className="font-semibold text-[18px] bg-black text-white p-2">
      <div className="text-[18px]">{account?.name}</div>
      <div>bal: <span className="text-[#f78b1d]">{account?.bal}</span></div>
    </div>

    <div id="multiplier" className="flex flex-col justify-center items-center h-[30vh]">
      {showBust && <div className="font-bold text-red-400 text-[2.5vw]"> Busted @ {bust}</div>}
      {cashed > 0 && <div className="font-bold text-green-400 text-[2vw]"> Cashed Out @ {cashed.toFixed(2)}</div>}
      {showRound && <div className="font-bold text-blue-400 text-[2vw]"> Next Round IN {round.toFixed(2)}s</div>}
      {!showBust && <div className="font-bold text-[5vw]"> {multiplier.toFixed(2)}X </div>}
    </div>

    <Divider className="bg-black" />

    <div className="self-start m-4">
      <span className="font-bold">Cashier</span>

      <div className="flex gap-4">
        <div className="flex flex-col">
          <span>Amount</span>
          <Input placeholder="Amt" className="font-bold text-lg w-[8vw] bg-white" onChange={e => setStake(e.target.value)} />
        </div>

        <div className="flex flex-col">
          <span>Auto Cashout</span>
          <Input placeholder="Auto" className="font-bold text-lg w-[8vw] bg-white" onChange={e => setCashout(e.target.value)} />
        </div>

        {/********* Bet ***********/}
        {bet < 1 && !pending &&
          <Button className="mt-6" onClick={() => account.placeBet(stake, showBust)}>Bet</Button>
        }

        {/************  Pending   ********/}
        {pending &&
          <div onClick={account?.cancelBet} className="flex flex-col font-bold text-[1.5vw] items-center bg-black rounded-lg p-2 text-orange-300">
            <div className="text-red-400">Cancel Bet</div>
            <div>{account?.stake}</div>
          </div>}


        {/************ Active ************/}
        {bet > 1 && !pending &&
          <div className="bg-black p-2 rounded-lg" onClick={() => account.cashierAction(bet, multiplier, showBust)}>
            <div className="text-white">Cash Out</div>
            <div className="font-bold text-[2vw] text-orange-300">{(bet * multiplier).toFixed(2)}</div>
          </div>
        }
      </div>
    </div>
  </div >
}


export default PlayRoom;
