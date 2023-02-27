
function Fixture(F) {
  return (
    <div className="card">
      <div>{F.ta}</div>
      <span>vs</span>
      <div>{F.tb}</div>
    </div>
  );
}

export default Fixture;
