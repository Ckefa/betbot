import { Card } from "@/components/ui/card";
import { Fragment } from "react";

type parVal = {
  params: { md: number; results: string[] };
};

function Results({ params }: parVal) {
  const { md, results } = params;

  console.log("Results rendered ....", md);

  return (
    <Card className="bg-black p-4 text-white shadow-lg">
      <Fragment>
        <div className="text-xl text-center">
          Matchday {md === 1 ? "30" : md - 1} Results
        </div>
        <div className="h-80 pt-4 flex flex-col justify-between">
          {results?.map((res, index) => (
            <div className="flex justify-center gap-4" key={index}>
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
