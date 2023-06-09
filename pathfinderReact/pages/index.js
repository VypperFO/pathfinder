import Navbar from "./Navbar";
import Grid from "./Grid";
import React, { useState } from "react";

export default function Home() {
  const [isClearBoard, setClearBoard] = useState(false);
  const [algorithm, setAlgorithm] = useState(0);

  const handleClearBoard = () => {
    setClearBoard(true);
  };

  const handleAlgorithm = () => {
    alert("cum");
  };
  return (
    <div>
      <Navbar clearBoard={handleClearBoard} algorithm={handleAlgorithm} />
      <main>
        <Grid isClearBoard={isClearBoard} algorithms={algorithm}></Grid>
      </main>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
      `}</style>
    </div>
  );
}
