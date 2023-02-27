import "./Vfl.css";
import { balance as bal } from "../navbar/Navbar";
import Game from "./Game";
import Table from "./Table";
import Results from "./Results";
import React, { useState, useEffect } from "react";

function Vfl() {
  const [data, setData] = useState([]);
  const [results, setRes] = useState([]);
  const [time, setX] = useState("");
  const [md, setMd] = useState("");
  const [stable, setShow] = useState(false);
  const [table, setTable] = useState([]);
  const [done, setDone] = useState("");
  const [slip, setSlip] = useState([]);
  const [sslip, setSslip] = useState(false);
  const [odds, setOdd] = useState(0.0);
  //const [bal, setBal] = useState("");
  const [stake, setStake] = useState(10);

  useEffect(() => {
    fetch("/fixtures/")
      .then((res) => res.json())
      .then((res) => {
        setX(res.x);
        setMd(res.y);
        setData(res.fixtures);
      });

    if (done !== md) {
      update();
    }
  });

  async function update() {
    const tb = await fetch("/results/");
    const res = await tb.json();
    setRes(res.results);
    setTable(res.table);
    setDone(md);
    setSlip([]);
    setOdd(0.0);
    setStake(10);

    //const bl = await fetch("http://127.0.0.1:8000/status/");
    //const r = await bl.jsn();
    //setBal(r);
  }

  const toggleTable = () => {
    setShow(!stable);
  };
  const toggleSlip = () => {
    setSslip(!sslip);
    //console.log(slip);
  };

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("slip"));
    setSlip(temp);
  }, []);

  useEffect(() => {
    localStorage.setItem("slip", JSON.stringify(slip));
  }, [slip]);

  function addSelect(r) {
    const st = slip.indexOf(r[0]) === -1;
    const st2 = slip.indexOf(r[1]) === -1;
    const sts = st && st2;
    if (r.length === 2) {
      let temp = [...slip, r[0]];
      temp = temp.filter((n) => n !== r[1]);
      setSlip(temp);
      if (sts) {
        let num = parseFloat(odds) + 0.55;
        setOdd(num.toFixed(2));
      }
    } else {
      setSlip(slip.filter((n) => n !== r[0]));
      let num = parseFloat(odds) - 0.55;
      setOdd(num.toFixed(2));
    }
  }

  function processBet() {
    console.log(bal);
  }

  return (
    <div>
      {/*------- toggle buttons ---------*/}

      <div className="buttons">
        <button onClick={toggleTable} className="show_table">
          {stable ? "hide" : "table"}
        </button>
        <button onClick={toggleSlip} className="show_slip">
          {sslip ? "hide slip" : "bet slip"}
        </button>
        {sslip && slip.length > 0 && (
          <div className="slip">
            <div>
              {slip.map((s) => (
                <div key={s} className="sitems">
                  <div className="stm">{s}</div>
                  <div className="sodd">1.55</div>
                  <button className="cbutton" onClick={() => addSelect([s])}>
                    X
                  </button>
                </div>
              ))}
              <div className="summary">
                <div>total</div>
                <div>{odds}</div>
              </div>
              <div className="summary">
                <div>P.win</div>
                <div>{(odds * stake).toFixed(2)}</div>
              </div>
              <div className="placeform"></div>
              <input
                onChange={(e) => setStake(e.target.value)}
                className="amount"
              />
              <button onClick={processBet} className="bet">
                place bet
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mbs">
        <span className="tittle">VIRTUAL EPL GAMES</span>
        <div className="mains">
          <div>
            {/*------- Results --------*/}
            <div className="mid2">
              <div className="announce">
                Matchday {md === "1" ? "30" : parseInt(md) - 1} Results
              </div>
              {results.map((n) => (
                <Results key={n} ta={n[0]} tb={n[1]} />
              ))}
            </div>
          </div>

          {stable && <Table tb={table} />}

          <div>
            {/* -------- fixtures -----------*/}

            <div>
              <div className="mid1">
                <div className="announce">
                  Matchday {md} Starts in {time}
                </div>
                {data.map((n) => (
                  <Game getTeam={addSelect} key={n} ta={n[0]} tb={n[1]} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vfl;
