// Login.js
import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(message => { throw new Error(message); });
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('loggedIn', 'true');
            window.location.href = '/dashboard'; // Redirect to dashboard or home page
        })
        .catch(error => {
            setErrorMessage(error.message);
        });
    };

    return (
        <div className="container">
            <div className="login-box">
                <h1 className="login-title">DalTalks</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Log In</button>
                    <div className="error-message">{errorMessage}</div>
                    <div className="forgot-password">
                        <a href="#">Forgot password?</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;