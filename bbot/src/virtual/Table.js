import "./Table.css";

function Table(T) {
  return (
    <div className="tcontainer">
      <div className="thead">
        <div>Team</div>
        <div>Pts</div>
        <div>Gpl</div>
        <div>win</div>
        <div>draw</div>
        <div>lose</div>
      </div>
      {T.tb.map((t, index) => (
        <div key={index}className="tbody">
          {t.map((z, index) => (
            <div key={index}>
                {z}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Table;
