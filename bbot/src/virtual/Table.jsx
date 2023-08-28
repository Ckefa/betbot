import { Card, Row, Col } from "antd";

function Table(T) {
  return (
    <Card className="border-[5px] border-blue-300 shadow-lg">
      <Row className="bg-blue-300">
        <Col span={4}>Team</Col>
        <Col span={4}>Pts</Col>
        <Col span={4}>Gpl</Col>
        <Col span={4}>win</Col>
        <Col span={4}>draw</Col>
        <Col span={4}>lose</Col>
      </Row>
      {T.tb.map((t, index) => (
        <Row span={4} key={index} className="">
          {t.map((z, index) => (
            <Col span={4} key={index}>
              <div className="mx-auto">{z}</div>
            </Col>
          ))}
        </Row>
      ))}
    </Card>
  );
}

export default Table;
