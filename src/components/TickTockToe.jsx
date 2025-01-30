import { useState, useEffect, useRef } from 'react';
import '../styles/TickTockToe.css';
import axios from 'axios';
import LoginName from './LoginName';

const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
//Makes the game board
const initialBoard = Array(9).fill(null);

//Winning combinations and finds the winner
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
    const username = localStorage.getItem("username"); //Retrieves username
    const [board, setBoard] = useState(initialBoard); //Game board setter
    const [isPlayerTurn, setIsPlayerTurn] = useState(true); //Turn tracker
    const [status, setStatus] = useState(`${username}, quickly make your move!`); //Status message
    const [timer, setTimer] = useState(10); //Game timer limit
    const [score, setScore] = useState(0); //Player score
    const intervalRef = useRef(null); //Game timer handler/setter
    const requestSentRef = useRef(false); //Score submission tracker
    const [gameStarted, setGameStarted] = useState(false);
    const [isTimerRunning, setIsTimerRunning] = useState(false);



    //Game timer handler
    useEffect(() => {
        if (gameStarted && !isTimerRunning) {
            setIsTimerRunning(true);
            intervalRef.current = setInterval(() => {
                setTimer((prev) => {
                    if (prev === 0) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;//Clears interval if timer runs out
                        if (!requestSentRef.current) {
                            sendScore(); //Sends score
                            requestSentRef.current = true;
                        }
                        setStatus(`Time's up, ${username}... \n You've scored ${score} points! \n To start again, \n make a new move.
                             `);
                        setGameStarted(false); // Reset gameStarted state to false
                        setIsTimerRunning(false); // Reset isTimerRunning state to false
                        return prev;
                    }
                    return prev - 1;
                });
            }, 1000); //Runs every 1 second
        }
    }, [gameStarted, isTimerRunning, score]);


    const sendScore = () => {
        if (score===0) { 
            return console.log(`Score was "0", not uploading ${username}'s score`); } 
        //Only sends score if score is greater than 0
        if (score > 0) { 
            axios.post('http://localhost:8080/api/scores', {
              username: username,
              score: score
            })
            .then(response => {
              console.log('Score submitted successfully:', response.data);
            })
            .catch(error => {
              console.error('There was an error submitting the score:', error);
            });
          }
    };


    useEffect(() => {//Computer's turn
        if (!isPlayerTurn && !calculateWinner(board)) {
            setStatus('Computer is thinking...');
            const emptySquares = board.map((value, index) => value === null ? index : null).filter(val => val !== null);//Finds empty squares
            const winningLines = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
            ];
    
            // Check if player is one move away from winning
            const playerWinningLines = winningLines.filter(line => {
                const [a, b, c] = line;
                return board[a] === 'X' && board[b] === 'X' && board[c] === null;
            });
    
            if (playerWinningLines.length > 0) {
                setTimeout(() => { //Delays computer move
                // Block player's potential winning line
                const blockingMove = playerWinningLines[0].find(index => board[index] === null);
                const newBoard = board.slice();
                newBoard[blockingMove] = 'O';
                setBoard(newBoard);
                setIsPlayerTurn(true);
                setStatus(`Your move, ${username}!`)
                }, 100);
            } else {
                // Make a random move if no blocking opportunity
                const randomMove = emptySquares[Math.floor(Math.random() * emptySquares.length)];
                if (randomMove !== undefined) {
                    setTimeout(() => {//Delays computer move
                        const newBoard = board.slice();
                        newBoard[randomMove] = 'O';
                        setBoard(newBoard);
                        setIsPlayerTurn(true);
                        setStatus(`Your move, ${username}!`);
                    }, 100);
                }
            }
        }
    }, [board, isPlayerTurn, username]);

    const handleClick = (index) => {
        if (board[index] || calculateWinner(board) || timer === 0) {
            if (!gameStarted) {
                resetGameState();
            } else {
                return; // Prevents player from making invalid moves
            }
        }
    
        const newBoard = board.slice();
        newBoard[index] = 'X'; // Updates board
        setBoard(newBoard);
        setIsPlayerTurn(false); // Computer's turn
        setGameStarted(true);
        console.log('Timer started!'); // Start the game
    };
    
    const resetGameState = () => {
        setBoard(initialBoard);
        setIsPlayerTurn(true);
        setStatus(`${username}, quickly make your move!`);
        setTimer(10);
        setScore(0);
        setGameStarted(true);
    };

    

    useEffect(() => {
        const winner = calculateWinner(board);
        if (winner) {
            setStatus(winner === 'X' ? 'You Scored!' : 'Computer Scored :(');
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

    useEffect(() => {
        const handleKeyDown = (event) => {
            const numpadMap = {
                '7': 0,
                '8': 1,
                '9': 2,
                '4': 3,
                '5': 4,
                '6': 5,
                '1': 6,
                '2': 7,
                '3': 8
            }
            const index = numpadMap[event.key];
          if (index !== undefined) {
            handleClick(index);
          }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }, [handleClick]);

    return (
        <main>
            {/* {isLoggedIn && <LoginName username={username} />} */}
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
            <div className="status" style={{ whiteSpace: 'pre-wrap' }}>
            {status}
            </div>
            {/* <button className="reset-clock" onClick={() => {
                setBoard(initialBoard);
                setStatus(`${username}, quickly make your move!`);
                setIsPlayerTurn(true);
                setTimer(10);
                setScore(0);
                requestSentRef.current = false;
            }}>
                10 Second Game
            </button> */}
        </div>
        </main>
    );
};

export default TickTockToe;
