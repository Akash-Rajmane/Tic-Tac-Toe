import { useState, useEffect } from "react";
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
  const [isComputerPlaying, setIsComputerPlaying] = useState(false); // Toggle computer mode

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

  useEffect(() => {
    if (!isXPlaying && isComputerPlaying && !result) {
      const computerMove = calculateBestMove(board, true).index;
      setTimeout(() => makeComputerMove(computerMove), 500); // Add delay for better UX
    }
  }, [isXPlaying, isComputerPlaying, board, result]);

  const handleBoxClick = (boxIdx) => {
    // If the game is finished or the box is already filled, return
    if (result || board[boxIdx]) {
      return;
    }

    // Play clicking ringtone
    clickAudio.play();

    // Update the board
    let updatedBoard = board.map((val, idx) => {
      if (idx === boxIdx) {
        return isXPlaying ? "X" : "O";
      } else {
        return val;
      }
    });

    setBoard(updatedBoard);

    const winner = checkWinner(updatedBoard);

    if (winner) {
      handleWinner(winner);
    } else {
      setIsXPlaying(!isXPlaying);
    }
  };

  const checkWinner = (board) => {
    for (let i = 0; i < WINNING_CONDITIONS.length; i++) {
      const [x, y, z] = WINNING_CONDITIONS[i];
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        return board[x];
      }
    }

    if (board.every((el) => el !== null)) {
      return "draw";
    }

    return null;
  };

  const handleWinner = (winner) => {
    if (winner === "draw") {
      setResult("It's a draw");
    } else {
      winAudio.play();
      setResult(`${winner} wins`);

      if (winner === "X") {
        setScores((prev) => ({ ...prev, xScore: prev.xScore + 1 }));
      } else {
        setScores((prev) => ({ ...prev, oScore: prev.oScore + 1 }));
      }
    }
  };

  const makeComputerMove = (move) => {
    let updatedBoard = board.map((val, idx) => (idx === move ? "O" : val));
    // Play clicking ringtone
    clickAudio.play();
    setBoard(updatedBoard);

    const winner = checkWinner(updatedBoard);
    if (winner) {
      handleWinner(winner);
    } else {
      setIsXPlaying(true);
    }
  };

  const calculateBestMove = (board, isMaximizing) => {
    const winner = checkWinner(board);
    if (winner === "X") return { score: -10 };
    if (winner === "O") return { score: 10 };
    if (winner === "draw") return { score: 0 };

    const moves = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        const newBoard = [...board];
        newBoard[i] = isMaximizing ? "O" : "X";
        const result = calculateBestMove(newBoard, !isMaximizing);
        moves.push({ index: i, score: result.score });
      }
    }

    if (isMaximizing) {
      return moves.reduce((best, move) =>
        move.score > best.score ? move : best
      );
    } else {
      return moves.reduce((best, move) =>
        move.score < best.score ? move : best
      );
    }
  };

  const resetBoard = () => {
    resetAudio.play();
    setBoard(Array(9).fill(null));
    setResult("");
    setIsXPlaying(true);
  };

  const resetGame = () => {
    resetBoard();
    setScores({ xScore: 0, oScore: 0 });
  };

  return (
    <>
      <Header />
      <button
        onClick={() => setIsComputerPlaying(!isComputerPlaying)}
        className="btn"
      >
        {!isComputerPlaying ? "Play vs Human" : "Play vs Computer"}
      </button>
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
