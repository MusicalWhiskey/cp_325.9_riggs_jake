import React from "react";
import RegistrationForm from "../components/RegistrationForm";
import "../styles/Pages.css"
import LoginForm from "../components/LoginForm";



export default function UserPage() {
    return (
        <main>
            <h1 className="title">TickTockToe</h1>
            <RegistrationForm />
            <LoginForm />
        </main>
    );
}