import { useState, useEffect } from 'react';
import '../styles/Game.css';

function calculateWinner(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isComputerTurn, setIsComputerTurn] = useState(false);
  const [playerWins, setPlayerWins] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute timer

  const xIsNext = currentMove % 2 === 0;

  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setIsComputerTurn(true); // Set computer turn to true after user's turn
  }

  function computerPlay() {
    const emptySquares = currentSquares.map((square, index) => [square, index]).filter(([square]) => !square);
    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    const [square, index] = emptySquares[randomIndex];
    const nextSquares = currentSquares.slice();
    nextSquares[index] = 'O'; // Computer plays as 'O'
    handlePlay(nextSquares);
    setIsComputerTurn(false); // Set computer turn to false after computer's turn
  }

  function handleClick(i) {
    if (calculateWinner(currentSquares) || currentSquares[i]) {
      return;
    }
    if (isComputerTurn) {
      return; // Prevent user from clicking during computer's turn
    }
    const nextSquares = currentSquares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    handlePlay(nextSquares);
  }

  useEffect(() => {
    if (isComputerTurn && !calculateWinner(currentSquares)) {
      const timeoutId = setTimeout(() => {
        computerPlay();
      }, 500); // Pause for 500ms (0.5s) before computer plays
      return () => clearTimeout(timeoutId);
    }
  }, [isComputerTurn, currentSquares]);

  const winner = calculateWinner(currentSquares);
  if (winner === 'X' && !history[currentMove].includes(null)) {
    setPlayerWins(playerWins + 1); // Increment player wins when player wins and game is not still in progress
    setGameOver(true); // Set game over to true
  }

  useEffect(() => {
    if (gameOver) {
      const timeoutId = setTimeout(() => {
        setHistory([Array(9).fill(null)]); // Reset game board
        setCurrentMove(0); // Reset current move
        setIsComputerTurn(false); // Reset computer turn
        setGameOver(false); // Reset game over
      }, 2000); // Reset game board after 2 seconds
      return () => clearTimeout(timeoutId);
    }
  }, [gameOver]);

  useEffect(() => {
    if (!winner && !currentSquares.includes(null)) {
      setGameOver(true); // Set game over to true
    }
  }, [currentSquares, winner]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timeoutId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000); // Decrease time left by 1 second every second
      return () => clearTimeout(timeoutId);
    } else {
      setGameOver(true); // Set game over to true when time runs out
    }
  }, [timeLeft]);

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (!currentSquares.includes(null)) {
    status = 'It\'s a tie!';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }
  
  return (
    <div className="game">
      <div className="game-board">
        <div className="board-row">
          {currentSquares.slice(0, 3).map((square, i) => (
            <button key={i} className="square" onClick={() => handleClick(i)}>
              {square}
            </button>
          ))}
        </div>
        <div className="board-row">
          {currentSquares.slice(3, 6).map((square, i) => (
            <button key={i + 3} className="square" onClick={() => handleClick(i + 3)}>
              {square}
            </button>
          ))}
        </div>
        <div className="board-row">
          {currentSquares.slice(6, 9).map((square, i) => (
            <button key={i + 6} className="square" onClick={() => handleClick(i + 6)}>
              {square}
            </button>
          ))}
        </div>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <div>Player Wins: {playerWins}</div>
        <div>Time Left: {timeLeft}</div>
      </div>
    </div>
  );
}