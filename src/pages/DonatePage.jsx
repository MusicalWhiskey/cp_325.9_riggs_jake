import { Routes } from "react-router-dom"
import "../styles/Pages.css"
import Venmo from "../assets/MW_Venmo.jpeg"
import "../styles/Donate.css"


export default function DonatePage() {
    return (
        <>
            <h2>If you enjoy this game... </h2><h2>...please consider buying me a coffee!</h2>
            <div><img src={Venmo} alt="Venmo" /></div>

            
        </>
    )
}