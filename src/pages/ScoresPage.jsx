import React from "react";
import Scores from "../components/Scores.jsx";
import "../styles/Pages.css"
import LoginName from "../components/LoginName.jsx";

const username = localStorage.getItem('username');


export default function ScoresPage() {
    return (
        <main>
            <LoginName username={username} />
            <Scores />
        </main>
    );
}