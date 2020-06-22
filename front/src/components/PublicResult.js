import React, { useState } from "react";
import historyData from "./data/history.json";

function PublicResult() {
  const [score, setScore] = useState([]);

  return (
    <div className="grid grid-cols-2 gap-2">
      {historyData.map((res) => (
        <div>{res.title}</div>
      ))}
    </div>
  );
}

export default PublicResult;
