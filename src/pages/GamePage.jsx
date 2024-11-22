import { useState } from 'react';
import { Link } from "react-router-dom";
import TickTockToe from "../components/TickTockToe";
export default function GamePage() {
    const username = localStorage.getItem("username");
    return (
        <>
            <TickTockToe />

        </>
    )
}