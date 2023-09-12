import { Card } from "@/components/ui/card";

type parVal = {
  tb: string[][];
};

function Table(T: parVal) {
  return (
    <Card className="border-[5px] border-blue-300 shadow-lg">
      <div className="bg-blue-300">
        <div>Team</div>
        <div>Pts</div>
        <div>Gpl</div>
        <div>win</div>
        <div>draw</div>
        <div>lose</div>
      </div>
      {T.tb?.map((t, index) => (
        <div key={index} className="">
          {t.map((z, index) => (
            <div key={index}>
              <div className="mx-auto">{z}</div>
            </div>
          ))}
        </div>
      ))}
    </Card>
  );
}

export default Table;
