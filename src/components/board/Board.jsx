import Box from "../box/Box";
import "./board.css";
import { memo } from "react";

const Board = ({ board, onClick }) => {
  const MemoizedBox = memo(Box);
  return (
    <section className="board__container">
      <div className="board">
        {board.map((val, idx) => {
          return (
            <MemoizedBox
              key={idx}
              val={val}
              onClick={() => val === null && onClick(idx)}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Board;
