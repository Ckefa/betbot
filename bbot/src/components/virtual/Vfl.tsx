import { Game, Results, Table, Client } from "@/components/virtual";
import { memo, useState, useEffect, useMemo } from "react";
import { Button, Card, Input } from "@/components/ui";
import { Divider } from "antd";

const MemodResults = memo(Results);
const MemodGame = memo(Game);
type parVal = {
  host: string;
  user: {
    name: string | null;
    bal: number;
    checkBalance: () => void;
  };
};
const client = new Client();

function Vfl({ host, user }: parVal) {
  const [data, setData] = useState([]);
  const [results, setRes] = useState([]);
  const [md, setMd] = useState<number>(0);
  const [stable, setShow] = useState(true);
  const [table, setTable] = useState([]);
  const [slip, setSlip] = useState<string[]>([]);
  const [sslip, setSslip] = useState(false);
  const [odds, setOdd] = useState<number>(0);
  const [stake, setStake] = useState<number>(10);
  const [intervalid, setIntervalid] = useState<NodeJS.Timeout | null>(null);
  const [timer, setTimer] = useState(30);
  const [change, setChange] = useState(false);
  const [active, setActive] = useState(0);

  const resParams = useMemo(() => ({ md, results }), [md, results]);
  const gameParams = useMemo(() => ({ data, addSelect, timer, slip }), [md]);

  useEffect(() => {
    const intervals = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    setIntervalid(intervals);
    return () => clearInterval(intervals);
  }, [change]);

  useEffect(() => {
    if (timer <= 0) {
      if (intervalid) clearInterval(intervalid);
      setChange(!change);
    }
  }, [timer, change, intervalid]);

  useEffect(() => {
    update(null);
  }, [change]);

  useEffect(() => {
    const rawTemp: string | null = localStorage.getItem("slip");
    if (rawTemp) {
      const temp: string[] = JSON.parse(rawTemp);
      update(temp);
      setSlip(temp);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("slip", JSON.stringify(slip));
  }, [slip]);

  async function update(temp: string[] | null) {
    client.fetch().then((data) => {
      setTimer(data.time);
      setMd(data.md);
      setTable(data.table);
      setData(data.fixtures);
      setRes(data.results);
    });

    setSlip(temp ? temp : []);
    setOdd(0.0);
    setStake(10);
  }

  const toggleTable = () => {
    setShow(!stable);
  };
  const toggleSlip = () => {
    setSslip(!sslip);
  };

  function addSelect(r: string[]) {
    const st = slip.indexOf(r[0]) === -1;
    const st2 = slip.indexOf(r[1]) === -1;
    const sts = st && st2;
    if (r.length === 2) {
      setSlip((prev) => {
        const new_list = prev.filter((n) => n !== r[1]);
        return [...new_list, r[0]];
      });
      if (sts) {
        setOdd((prev: number) => {
          const num = prev + 0.55;
          return parseFloat(num.toFixed(2));
        });
      }
    } else {
      setSlip((prev) => prev.filter((n) => n !== r[0]));
      setOdd((prev: number) => {
        const num = prev - 0.55;
        return parseFloat(num.toFixed(2));
      });
    }
    //console.log(r);
  }

  function processBet() {
    if (stake < 10) alert("Minimum stake is Ksh.10.");
    else if (stake > user.bal || user.bal < 10)
      alert("Insufficient balance please top up your account.");
    else {
      user.bal -= stake;
      fetch(`${host}place`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slip: slip, stake: stake, odds: odds }),
      })
        .then((resp) => resp.json())
        .then((resp) => console.log(resp));
    }
    user.checkBalance();
  }

  const tabs = [
    {
      content: (
        <div>
          {/*------- Results --------*/}
          <MemodResults params={resParams} />
        </div>
      ),
    },
    {
      content: <div>{stable && <Table tb={table} />}</div>,
    },
  ];

  return (
    <div>
      <div className="pt-8 flex flex-col">
        <div className="flex justify-center items-center gap-16">
          <div>
            <div className="text-3xl text-blalck-900">VIRTUAL EPL GAMES</div>
          </div>
          {/*------- toggle buttons ---------*/}
          <div>
            <Card className="mr-auto p-1 bg-gray-400">
              <div className="flex gap-4">
                <Button onClick={toggleTable} variant="outline" className="">
                  {stable ? "hide" : "table"}
                </Button>
                <Button
                  onClick={toggleSlip}
                  variant="outline"
                  className="bg-yellow-400"
                >
                  {sslip ? "hide slip" : "bet slip"}
                </Button>
              </div>

              {sslip && slip.length > 0 && (
                <div className="border-4 rounded-3xl border-lime-500 bg-white absolute z-10">
                  <div className="">
                    {slip.map((s) => (
                      <div key={s} className="flex justify-around">
                        <div className="">{s}</div>
                        <div className="">1.55</div>
                        <Button
                          className="bg-red-400"
                          onClick={() => addSelect([s])}
                        >
                          X
                        </Button>
                      </div>
                    ))}
                    <div className="flex justify-around">
                      <div>total</div>
                      <div>{odds}</div>
                    </div>
                    <div className="flex justify-around">
                      <div>P.win</div>
                      <div>{(odds * stake).toFixed(2)}</div>
                    </div>
                    <div className="flex flex-div">
                      <Input
                        value={stake}
                        type="number"
                        onChange={(e) => setStake(parseFloat(e.target.value))}
                        className="flex-1"
                      />
                      <Button
                        onClick={processBet}
                        className="bg-blue-400 border rounded-2xl boder-yellow-300 text-orange-600"
                      >
                        place bet
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>

        <Divider />
        <div className="mx-auto">
          <Button variant="outline" onClick={() => setActive(0)}>
            Results
          </Button>
          <Button variant="outline" onClick={() => setActive(1)}>
            Table
          </Button>
        </div>

        <div className="grid grid-cols-12 pb-8 gap-4">
          <Card className="col-span-5 bg-black text-white shadow-lg">
            <div className="text-xl text-center">
              Matchday {md} Starts in: {timer}
            </div>

            {/* ---------- fixtures -----------*/}
            <MemodGame params={gameParams} />
          </Card>
          <div className="col-span-4"> {tabs[active].content}</div>

          <div className="col-span-3 hidden lg:block border-4 rounded-3xl border-lime-500 bg-white">
            <div className="">
              {slip.map((s) => (
                <div key={s} className="flex justify-around">
                  <div className="">{s}</div>
                  <div className="">1.55</div>
                  <Button className="bg-red-400" onClick={() => addSelect([s])}>
                    X
                  </Button>
                </div>
              ))}
              <div className="flex justify-around">
                <div>total</div>
                <div>{odds}</div>
              </div>
              <div className="flex justify-around">
                <div>P.win</div>
                <div>{(odds * stake).toFixed(2)}</div>
              </div>
              <div className="flex flex-div">
                <Input
                  value={stake}
                  type="number"
                  onChange={(e) => setStake(parseFloat(e.target.value))}
                  className="flex-1"
                />
                <Button
                  onClick={processBet}
                  className="bg-blue-400 border rounded-2xl boder-yellow-300 text-orange-600"
                >
                  place bet
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vfl;
