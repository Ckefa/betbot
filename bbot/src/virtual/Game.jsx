import { Card } from "antd";
import { Fragment } from "react";

function Game({ params }) {
  const { md, data, addSelect } = params;
  const styles = "p-[2px] text-black bg-yellow-300";
  //console.log("Game Rendered", md);

  const select = (ta, tb) => {
    const doc = document.getElementById(ta);
    const opp = document.getElementById(tb);

    if (!doc.classList.value.includes("yellow")) {
      doc.classList.value = styles;
      opp.classList.value = "";
      addSelect([doc.id, tb]);
    } else {
      doc.classList.value = "";
      addSelect([doc.id]);
    }
  };

  return (
    <div className="m-2 h-80 flex flex-col justify-between">
      {data.map((fix, index) => (
        <div key={index} className="flex justify-between">
          <div id={fix[0]} onClick={(e) => select(fix[0], fix[1])}>
            {fix[0]}
          </div>
          <div>vs</div>
          <div id={fix[1]} onClick={(e) => select(fix[1], fix[0])}>
            {fix[1]}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Game;
