import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);

  useEffect(() => {
    // runs once after initial render
    const savedXScore = localStorage.getItem("xScore"); // retrieving from local storage
    const savedOScore = localStorage.getItem("oScore");
    if (savedXScore) setXScore(parseInt(savedXScore, 10));
    if (savedOScore) setOScore(parseInt(savedOScore, 10));
  }, []);

  useEffect(() => {
    localStorage.setItem("xScore", xScore); // setting scores in the local storage
    localStorage.setItem("oScore", oScore);
  }, [xScore, oScore]);

  const handleClick = (index) => {
    const newBoard = [...board];
    if (calculateWinner(board) || board[index]) {
      return;
    }
    newBoard[index] = isXNext ? "X" : "O"; // update cell based on whose turn it is
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const winner = calculateWinner(newBoard);
    if (winner) {
      if (winner === "X") {
        setXScore(xScore + 1);
      } else if (winner === "O") {
        setOScore(oScore + 1);
      }
      setTimeout(() => resetBoard(), 2000);
    } else if (!newBoard.includes(null)) {
      setTimeout(() => resetBoard(), 2000);
    }
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
  };

  const renderSquare = (index) => {
    return (
      <button
        className={`square ${board[index] === "X" ? "blue" : "red"}`}
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  return (
    <div className="game">
      <div className="scoreboard">
        <div className="score blue">X: {xScore}</div>
        <div className="score red">O: {oScore}</div>
      </div>
      <div className="board">
        {board.map((_, index) => renderSquare(index))}
      </div>
    </div>
  );
}

export default App;
