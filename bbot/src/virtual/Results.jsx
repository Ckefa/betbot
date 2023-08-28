import { Card } from "antd";
import { Fragment } from "react";

function Results({ params }) {
  const { md, results } = params;

  return (
    <Card className="bg-black text-white shadow-lg">
      <Fragment>
        <div className="text-xl">
          Matchday {md === "1" ? "30" : parseInt(md) - 1} Results
        </div>
        <div className="h-80 flex flex-col justify-around">
          {results.map((res, index) => (
            <div className="flex justify-between" key={index}>
              <div>{res[0][0]}</div>
              <div className="text-blue-300 text-lg">{res[0][1]}</div>
              <div>-</div>
              <div className="text-blue-300 text-lg">{res[1][1]}</div>
              <div>{res[1][0]}</div>
            </div>
          ))}
        </div>
      </Fragment>
    </Card>
  );
}

export default Results;
