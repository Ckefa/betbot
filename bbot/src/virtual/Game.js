//import React, { useState } from "react";

function Game(G) {
  const select1 = (e) => {
    var doc = e.target;
    if (doc.style.color === "white" || doc.style.color === "") {
      doc.style.color = "black";
      doc.style.background = "yellow";
      doc.style.padding = "1.4vw";
      document.getElementById(G.tb).style.color = "white";
      document.getElementById(G.tb).style.background = "none";
      document.getElementById(G.tb).style.padding = "0vw";
      G.getTeam([G.ta, G.tb]);
    } else {
      doc.style.color = "white";
      doc.style.background = "none";
      doc.style.padding = "0vw";
      G.getTeam([G.ta]);
    }
  };

  const select2 = (e) => {
    var doc = e.target;
    if (doc.style.color === "white" || doc.style.color === "") {
      doc.style.color = "black";
      doc.style.background = "yellow";
      doc.style.padding = "1.4vw";
      document.getElementById(G.ta).style.color = "white";
      document.getElementById(G.ta).style.background = "none";
      document.getElementById(G.ta).style.padding = "0vw";
      G.getTeam([G.tb, G.ta]);
    } else {
      doc.style.color = "white";
      doc.style.background = "none";
      doc.style.padding = "0vw";
      G.getTeam([G.tb]);
    }
  };

  return (
    <div className="card1">
      <div id={G.ta} onClick={select1}>
        {G.ta}
      </div>
      <div>vs</div>
      <div id={G.tb} onClick={select2}>
        {G.tb}
      </div>
    </div>
  );
}

export default Game;
