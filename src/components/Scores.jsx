import React from "react";

export default function Scores() {
    const [allScores, setAllScores] = React.useState([]);

    const fetchScores = async () => 
        {
            try {
                const response = await fetch('http://localhost:4000/scores');
                const scores = await response.json();
                setAllScores(scores);
            } catch (error) {
                console.log(error);
            }
    }

    React.useEffect(() => {
        fetchScores();
    }, []);


    return (
        <main>
            <h1>High Scores</h1>
            <div>
                {allScores.map((score) => (
                    <div>
                        <p>{score.username}</p>
                        <p>{score.score}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}