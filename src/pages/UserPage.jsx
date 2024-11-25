import React from "react";
import UserForm from "../components/UserForm";
import "../styles/Pages.css"


export default function UserPage() {
    return (
        <main>
            <h1 className="title">TickTockToe</h1>
            <UserForm />
        </main>
    );
}