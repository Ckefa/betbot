import "./Home.css";
import Fixture from "./Fixture";

function Home() {
  class Matchday {
    constructor(ta, tb) {
      this.ta = ta;
      this.tb = tb;
    }
  }

  const m1 = new Matchday("Arsenal", "Chelsea");
  const m2 = new Matchday("Liverpool", "ManCity");
  const m3 = new Matchday("Leicister", "ManUnited");

  const matches = [m1, m2, m3];

  return (
    <div className="container">
      <div className="intro">
        Betbot uses machine learning technology to predict an outcome of a
        football match
      </div>
      <div className="mid">
        {matches.map((m) => (
          <Fixture key={m.ta} ta={m.ta} tb={m.tb} />
        ))}
      </div>
    </div>
  );
}

export default Home;
