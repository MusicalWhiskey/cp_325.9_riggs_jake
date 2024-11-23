import { useState, useEffect, useRef } from 'react';
import '../styles/TickTockToe.css';
import axios from 'axios';

const initialBoard = Array(9).fill(null);

const calculateWinner = (board) => {
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

    for (let line of lines) {
        const [a, b, c] = line;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
};

const TickTockToe = () => {
    const username = localStorage.getItem("username");
    const [board, setBoard] = useState(initialBoard);
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [status, setStatus] = useState(`${username}, make your move!`);
    const [timer, setTimer] = useState(10);
    const [score, setScore] = useState(0);
    const intervalRef = useRef(null);
    const requestSentRef = useRef(false);

    useEffect(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            setTimer((prev) => {
                if (prev === 0) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                    if (!requestSentRef.current) {
                        sendScore();
                        requestSentRef.current = true;
                    }
                    setStatus(`Time's up, ${username}! You've scored ${score} points.`);
                    return prev;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(intervalRef.current);
    }, [score]);

    const sendScore = () => {
        axios.post('http://localhost:4000/api/scores', {
            username: username,
            score: score
        })
        .then(response => {
            console.log('Score submitted successfully:', response.data);
        })
        .catch(error => {
            console.error('There was an error submitting the score:', error);
        });
    };

    useEffect(() => {
        if (!isPlayerTurn && !calculateWinner(board)) {
            setStatus('Computer is thinking...');
            const emptySquares = board.map((value, index) => value === null ? index : null).filter(val => val !== null);
            const randomMove = emptySquares[Math.floor(Math.random() * emptySquares.length)];
            if (randomMove !== undefined) {
                setTimeout(() => {
                    const newBoard = board.slice();
                    newBoard[randomMove] = 'O';
                    setBoard(newBoard);
                    setIsPlayerTurn(true);
                    setStatus(`Your move, ${username}!`);
                }, 100);
            }
        }
    }, [isPlayerTurn, board]);

    const handleClick = (index) => {
        if (board[index] || calculateWinner(board) || timer === 0) {
            return;
        }

        const newBoard = board.slice();
        newBoard[index] = 'X';
        setBoard(newBoard);
        setIsPlayerTurn(false);
    };

    useEffect(() => {
        const winner = calculateWinner(board);
        if (winner) {
            setStatus(winner === 'X' ? 'You win!' : 'Computer score!');
            if (winner === 'X') {
                setScore((prev) => prev + 1);
            }
            setTimeout(() => {
                setBoard(initialBoard);
                setStatus('Your Move!');
                setIsPlayerTurn(true);
            }, 100);
        } else if (!board.includes(null)) {
            setStatus('Draw!');
            setTimeout(() => {
                setBoard(initialBoard);
                setStatus('Your Move!');
                setIsPlayerTurn(true);
            }, 100);
        }
    }, [board]);

    return (
        <div className="board-container">
            <div className="game-info">
                <span className='timer'>{timer} Seconds Remaining</span><span className='score'>Score: {score}</span>
            </div>
            <div className="board">
                {board.map((value, index) => (
                    <button className="square"
                        key={index}
                        onClick={() => handleClick(index)}>
                        {value}
                    </button>
                ))}
            </div>
            <div className="status">
            {status}
            </div>
        </div>
    );
};

export default TickTockToe;
