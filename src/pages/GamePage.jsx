export default function GamePage() {
    const username = localStorage.getItem("username");
    return (
        <>
            <h1>Hello, {username}!</h1>

            <h1>Game</h1>
        </>
    )
}