type parVal = {
  params: { data: string[]; addSelect: (r: string[]) => void };
};

function Game({ params }: parVal) {
  const { data, addSelect } = params;
  const styles = "p-[2px] text-black bg-yellow-300";
  //console.log("Game Rendered", md);

  const select = (ta: string, tb: string) => {
    const doc = document.getElementById(ta);
    const opp = document.getElementById(tb);

    if (!doc?.classList.value.includes("yellow") && doc) {
      doc.classList.value = styles;
      if (opp) opp.classList.value = "";
      addSelect([doc?.id, tb]);
    } else if (doc) {
      doc.classList.value = "";
      addSelect([doc?.id]);
    }
  };

  return (
    <div className="p-4 h-80 flex flex-col justify-between">
      {data?.map((fix, index) => (
        <div key={index} className="flex justify-center gap-[8rem]">
          <div id={fix[0]} onClick={() => select(fix[0], fix[1])}>
            {fix[0]}
          </div>
          <div>vs</div>
          <div id={fix[1]} onClick={() => select(fix[1], fix[0])}>
            {fix[1]}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Game;
