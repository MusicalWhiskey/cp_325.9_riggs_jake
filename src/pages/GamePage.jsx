import { useState } from 'react';
import { Link } from "react-router-dom";
import TickTockToe from "../components/TickTockToe";
import "../styles/Pages.css"

export default function GamePage() {
    const username = localStorage.getItem("username");
    return (
        <>
            <TickTockToe />

        </>
    )
}