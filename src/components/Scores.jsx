import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";


export default function Scores() {
    const [allScores, setAllScores] = useState([]);

    const fetchScores = async () => 
        {
            try {
                const response = await axios.get("http://localhost:3000/scores");
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
            <h1>High Scores</h1>
            <div>
                {allScores.map((score) => (
                    <div key={score._id}>
                        <p>{score.username}</p>
                        <p>{score.score}</p>
                        <p>{score.date}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}