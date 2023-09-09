import { Card } from "@/components/ui/card";

function Table(T) {
  return (
    <Card className="border-[5px] border-blue-300 shadow-lg">
      <div className="bg-blue-300">
        <div span={4}>Team</div>
        <div span={4}>Pts</div>
        <div span={4}>Gpl</div>
        <div span={4}>win</div>
        <div span={4}>draw</div>
        <div span={4}>lose</div>
      </div>
      {T.tb.map((t, index) => (
        <div span={4} key={index} className="">
          {t.map((z, index) => (
            <div span={4} key={index}>
              <div className="mx-auto">{z}</div>
            </div>
          ))}
        </div>
      ))}
    </Card>
  );
}

export default Table;
