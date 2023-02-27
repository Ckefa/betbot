function Results(R) {
  return (
    <div className="card1">
      <div>{R.ta[0]}</div>
      <div className="score">{R.ta[1]}</div>
      <div>-</div>
      <div className="score">{R.tb[1]}</div>
      <div>{R.tb[0]}</div>
    </div>
  );
}

export default Results;
