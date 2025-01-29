import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import '../styles/Scores.css'


export default function Scores() {
    const [allScores, setAllScores] = useState([]);

    const fetchScores = async () => 
        {
            try {
                const response = await axios.get("http://localhost:8080/scores");
                const sortedScores = response.data.sort((a, b) => b.score - a.score);
                setAllScores(sortedScores);
                setAllScores(response.data);
            } catch (error) {
                console.error(error);
            }
    }

    useEffect(() => {
        fetchScores();
    }, []);


    return (
        <main>
            <h1 className="scores-title">High Scores</h1>
            <div>
                {allScores.map((score) => (
                    <div className="full-score" key={score._id}>
                        <p className="username">{score.username}</p>
                        <p className="score">Score:<span className="score-number">{score.score}</span></p>
                        <p className="date">{score.date}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}