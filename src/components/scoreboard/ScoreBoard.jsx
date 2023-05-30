import { memo } from "react";
import "./scoreboard.css";
import ResetButton from "../resetbutton/ResetButton";

const ScoreBoard = ({ scores, isXPlaying, resetGame, resetBoard, result }) => {
  let { xScore, oScore } = scores;
  let playersTurn = isXPlaying ? "X's turn" : "O's turn";
  const ResetGameBtn = memo(ResetButton);
  const ResetBoardBtn = memo(ResetButton);

  return (
    <section className="scoreboard__container">
      <h2 className="text">Score Board</h2>
      <div className="scoreboard">
        <span className={`score x-score ${!isXPlaying && "inactive"}`}>
          X - {xScore}
        </span>
        <span className={`score o-score ${isXPlaying && "inactive"}`}>
          O - {oScore}
        </span>
      </div>
      <div className="content">{result ? result : `${playersTurn}`}</div>
      <div className="btn__container">
        <ResetGameBtn onClick={resetGame} btnText={" Reset Game"} />
        <ResetBoardBtn onClick={resetBoard} btnText={" Reset Board"} />
      </div>
    </section>
  );
};

export default ScoreBoard;
