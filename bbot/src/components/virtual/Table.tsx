import { Card } from "@/components/ui/card";

type parVal = {
  tb: string[][];
};

function Table(T: parVal) {
  return (
    <Card className="border border-blue-300 shadow-lg">
      <div className="mx-auto p-2 grid grid-cols-6 gap-4 bg-blue-300">
        <div>Team</div>
        <div>Pts</div>
        <div>Gpl</div>
        <div>win</div>
        <div>draw</div>
        <div>lose</div>
      </div>
      {T.tb?.map((t, index) => (
        <div key={index} className="mx-auto grid grid-cols-6 gap-4">
          {t.map((z, index) => (
            <div key={index}>
              <div>{z}</div>
            </div>
          ))}
        </div>
      ))}
    </Card>
  );
}

export default Table;
