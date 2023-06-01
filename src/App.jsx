import { useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Board from "./components/board/Board";
import ScoreBoard from "./components/scoreboard/ScoreBoard";
import winningAudio from "./assets/applause.mp3";
import clickingAudio from "./assets/click.mp3";
import swooshAudio from "./assets/swoosh.mp3";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXPlaying, setIsXPlaying] = useState(true);
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [result, setResult] = useState("");
  const winAudio = new Audio(winningAudio);
  const clickAudio = new Audio(clickingAudio);
  const resetAudio = new Audio(swooshAudio);

  const WINNING_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleBoxClick = (boxIdx) => {
    //If the game is finished then return
    if (result) {
      return;
    }

    // Play clicking ringtone
    clickAudio.play();

    //Update the board
    let updatedBoard = board.map((val, idx) => {
      if (idx === boxIdx) {
        return isXPlaying ? "X" : "O";
      } else {
        return val;
      }
    });

    setBoard(updatedBoard);

    let winner = checkWinner(updatedBoard);

    if (winner) {
      // play winning ringtone
      winAudio.play();
      if (winner === "X") {
        let { xScore } = scores;
        xScore += 1;
        setScores({ ...scores, xScore });
      } else {
        let { oScore } = scores;
        oScore += 1;
        setScores({ ...scores, oScore });
      }
    }

    // Change the active player
    setIsXPlaying(!isXPlaying);
  };

  const checkWinner = (board) => {
    for (let i = 0; i < WINNING_CONDITIONS.length; i++) {
      const [x, y, z] = WINNING_CONDITIONS[i];

      // Iterate through winning conditions and check if either player satisfies them
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setResult(`${board[x]} wins`);
        return board[x];
      }
    }

    // Check if the game is draw
    if (board.every((el) => el !== null)) {
      setResult("It's a draw");
      return;
    }
  };

  // Reset the board only
  const resetBoard = () => {
    // Play the reset ringtone
    resetAudio.play();
    setBoard(Array(9).fill(null));
    setResult("");
    setIsXPlaying(true);
  };

  // Reset the entire game(board+score)
  const resetGame = () => {
    resetBoard();
    setScores({ xScore: 0, oScore: 0 });
  };

  return (
    <>
      <Header />
      <main className="main__container">
        <Board board={board} onClick={handleBoxClick} />
        <ScoreBoard
          scores={scores}
          isXPlaying={isXPlaying}
          result={result}
          resetGame={resetGame}
          resetBoard={resetBoard}
        />
      </main>
    </>
  );
}

export default App;
