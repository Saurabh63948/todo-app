import React, { useState } from "react";
import styles from "./TicTacToe.module.css";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winningCells, setWinningCells] = useState([]);
  const [isFading, setIsFading] = useState(false);

  // Function to check for a winner
  const checkWinner = (squares) => {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], winningCombo: combo };
      }
    }
    return null;
  };

  // Check for winner or draw
  const result = checkWinner(board);
  const winner = result ? result.winner : null;
  const isDraw = !winner && board.every(cell => cell !== null);

  const handleClick = (index) => {
    if (board[index] || winner || isDraw) return;
    
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const result = checkWinner(newBoard);
    if (result) {
      setWinningCells(result.winningCombo);
    }
  };

  const resetGame = () => {
    setIsFading(true);
    setTimeout(() => {
      setBoard(Array(9).fill(null));
      setIsXNext(true);
      setWinningCells([]);
      setIsFading(false);
    }, 500);
  };

  return (
    <div className={styles.gameContainer}>
      <h1 className={styles.title}>Tic-Tac-Toe</h1>

      <div className={`${styles.board} ${isFading ? styles.fadeOut : ""}`}>
        {board.map((cell, index) => (
          <div 
            key={index} 
            className={`${styles.cell} ${winningCells.includes(index) ? styles.winningCell : ""}`} 
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>

      <p className={styles.status}>
        {winner ? `Winner: ${winner} 🎉` : isDraw ? "It's a Draw! 😃" : `Next Player: ${isXNext ? "X" : "O"}`}
      </p>

      <button className={styles.restartButton} onClick={resetGame}>Restart</button>
    </div>
  );
};

export default TicTacToe;
