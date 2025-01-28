import React from "react";

const WelcomeScreen = () => {
    const [credentials, setCredentials] = useState({
        username: ''
    });

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    return (
        <main>
            <h2 className="Greeting">Welcome, {credentials.username}!</h2>
            <input type="text" name="username" placeholder="Username" value={credentials.username} onChange={handleChange} required />
        </main>
    );
};

export default WelcomeScreen;