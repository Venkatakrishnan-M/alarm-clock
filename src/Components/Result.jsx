import { useState } from "react";

function Result({ desc, time, id, onRemove }) {
  let removeThisComponent = () => {
    onRemove(id);
  };

  return (
    <div className="outputContainer">
      <p>{desc}</p>
      <p>{time}</p>
      <button onClick={removeThisComponent}>Remove</button>
    </div>
  );
}
export default Result;
