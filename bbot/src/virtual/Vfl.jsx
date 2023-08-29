//import "./Vfl.css";
import Game from "./Game";
import Table from "./Table";
import Results from "./Results";
import React, { memo, useState, useEffect, useMemo, Fragment } from "react";
import { Layout, Input, Space, Row, Col, Card, Button } from "antd";

const MemodResults = memo(Results);
const MemodGame = memo(Game);

function Vfl({ host, user, setBal }) {
  const [data, setData] = useState([]);
  const [results, setRes] = useState([]);
  const [md, setMd] = useState("");
  const [stable, setShow] = useState(true);
  const [table, setTable] = useState([]);
  const [done, setDone] = useState("");
  const [slip, setSlip] = useState([]);
  const [sslip, setSslip] = useState(false);
  const [odds, setOdd] = useState(0.0);
  const [stake, setStake] = useState(10);
  const [intervalid, setIntervalid] = useState(null);
  const [timer, setTimer] = useState(30);
  const [change, setChange] = useState(false);

  const resParams = useMemo(() => ({ md, results }), [md]);
  const gameParams = useMemo(
    () => ({ md, data, addSelect, timer, slip }),
    [md]
  );

  //console.log("Vfl rendered: ", timer);

  useEffect(() => {
    let intervals = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    setIntervalid(intervals);
    return () => clearInterval(intervals);
  }, [change]);

  useEffect(() => {
    if (timer <= 0) {
      clearInterval(intervalid);
      setChange(!change);
    }
  }, [timer]);

  useEffect(() => {
    fetch(`${host}fixtures`)
      .then((res) => res.json())
      .then((res) => {
        setTimer(res.x);
        setMd(res.y);
        setData(res.fixtures);
        //console.log(`Matchday ${res.y} fetched`);
      });

    if (done !== md) {
      update();
    }
  }, [change]);

  //useEffect(() => console.log(slip), [slip]);
  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("slip"));
    update(temp);
    setSlip(temp);
  }, []);

  useEffect(() => {
    localStorage.setItem("slip", JSON.stringify(slip));
  }, [slip]);

  async function update(temp) {
    const tb = await fetch(`${host}results`);
    const res = await tb.json();
    setRes(res.results);
    setTable(res.table);
    setDone(md);
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

  const saveSlip = () => {
    const temp = JSON.parse(localStorage.getItem("slip"));
    setSlip(temp);
  };

  function addSelect(r) {
    const st = slip.indexOf(r[0]) === -1;
    const st2 = slip.indexOf(r[1]) === -1;
    const sts = st && st2;
    if (r.length === 2) {
      setSlip((prev) => {
        const new_list = prev.filter((n) => n !== r[1]);
        return [...new_list, r[0]];
      });
      if (sts) {
        setOdd((prev) => {
          let num = parseFloat(prev) + 0.55;
          return num.toFixed(2);
        });
      }
    } else {
      setSlip((prev) => prev.filter((n) => n !== r[0]));
      setOdd((prev) => {
        let num = prev - 0.55;
        return num.toFixed(2);
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
      setBal(user.bal);
      setTable(user.bal);
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

  return (
    <Layout>
      <Space direction="vertical">
        <Row className="m-3 justify-around items-center">
          <Col>
            <div className="text-3xl text-blalck-900">VIRTUAL EPL GAMES</div>
          </Col>
          {/*------- toggle buttons ---------*/}
          <Col>
            <Card className="bg-gray-400">
              <Space>
                <Button onClick={toggleTable} className="bg-lime-400">
                  {stable ? "hide" : "table"}
                </Button>
                <Button onClick={toggleSlip} className="bg-yellow-400">
                  {sslip ? "hide slip" : "bet slip"}
                </Button>
              </Space>

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
                    <div className="flex flex-row">
                      <Input
                        value={stake}
                        type="number"
                        onChange={(e) => setStake(e.target.value)}
                        className="flex-1"
                        allowClear
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
          </Col>
        </Row>

        <Row className="flex justify-around">
          <Col lg={6} md={10} xs={22}>
            <Card className="bg-black text-white shadow-lg">
              <div className="text-xl text-lime-300">
                Matchday {md} Starts in: {timer}
              </div>
              {/* ---------- fixtures -----------*/}
              <MemodGame params={gameParams} />
            </Card>
          </Col>

          <Col lg={6} md={10} xs={22}>
            {/*------- Results --------*/}
            <MemodResults params={resParams} />
          </Col>

          {stable && (
            <Col lg={6} md={10} xs={22}>
              {stable && <Table tb={table} />}
            </Col>
          )}
        </Row>
      </Space>
    </Layout>
  );
}

export default Vfl;
