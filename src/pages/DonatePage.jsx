import { Routes } from "react-router-dom"
import "../styles/Pages.css"
import Venmo from "../assets/MW_Venmo.jpeg"
import "../styles/Donate.css"
import LoginName from "../components/LoginName.jsx"

const username = localStorage.getItem('username');

export default function DonatePage() {
    return (
        <>
        <LoginName username={username} />
            <h2>If you enjoy this game... </h2><h2>...please consider buying me a coffee!</h2>
            <div><img src={Venmo} alt="Venmo" /></div>

            
        </>
    )
}