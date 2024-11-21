import { useState } from 'react';
import { Link } from "react-router-dom";
import Game from "../components/Game";

export default function GamePage() {
    const username = localStorage.getItem("username");
    return (
        <>
            <p>Time to Tick Tock Toe, {username}!</p>
            <Game />

        </>
    )
}