import React, { useState } from "react";

const Grid = ({ isClearBoard, algorithms }) => {
  const [paintedCells, setPaintedCells] = useState([]);
  const [isPainting, setIsPainting] = useState(false);

  if (isClearBoard) {
    handleClearBoard();
    alert("cum");
  }

  const handleCellClick = (row, column) => {
    if (isPainting) {
      const paintedCell = `${row},${column}`;
      setPaintedCells((prevCells) => [...prevCells, paintedCell]);
    }
  };

  const handleCellEnter = (row, column) => {
    if (isPainting) {
      const paintedCell = `${row},${column}`;
      setPaintedCells((prevCells) => [...prevCells, paintedCell]);
    }
  };

  const handleMouseDown = () => {
    setIsPainting(true);
  };

  const handleMouseUp = () => {
    setIsPainting(false);
  };

  const handleClearBoard = () => {
    setPaintedCells([]);
  };

  const renderGrid = () => {
    const rows = [];

    for (let i = 0; i < 28; i++) {
      const cells = [];

      for (let j = 0; j < 100; j++) {
        const cellKey = `${i},${j}`;
        const isPainted = paintedCells.includes(cellKey);

        cells.push(
          <td
            key={cellKey}
            id={`${i}-${j}`}
            className={isPainted ? "wall" : "unvisited"}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseEnter={() => handleCellEnter(i, j)}
            onClick={() => handleCellClick(i, j)}
          />
        );
      }

      rows.push(
        <tr key={i} id={i}>
          {cells}
        </tr>
      );
    }

    return rows;
  };

  return (
    <div>
      <table>
        <tbody>{renderGrid()}</tbody>
      </table>
      <style jsx global>{`
        td {
          width: 25px;
          height: 25px;
        }

        td,
        th {
          padding: 0;
        }

        table {
          margin: 10px;
          border-spacing: 0;
        }

        .unvisited {
          border: 1px solid rgb(175, 216, 248);
          background-color: white;
        }

        .wall {
          animation-name: wallAnimation;
          animation-duration: 0.3s;
          animation-timing-function: ease-out;
          animation-delay: 0;
          animation-direction: alternate;
          animation-iteration-count: 1;
          animation-fill-mode: forwards;
          animation-play-state: running;
        }

        @keyframes wallAnimation {
          0% {
            transform: scale(0.3);
            background-color: rgb(12, 53, 71);
          }

          50% {
            transform: scale(1.2);
            background-color: rgb(12, 53, 71);
          }

          100% {
            transform: scale(1);
            background-color: rgb(12, 53, 71);
          }
        }
      `}</style>
    </div>
  );
};

export default Grid;
