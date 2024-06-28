import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Login.css';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [securityQuestion, setSecurityQuestion] = useState('');
    const [securityAnswer, setSecurityAnswer] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password || !securityQuestion || !securityAnswer) {
            alert('Please fill in all required fields');
            return;
        }

        const formData = {
            email,
            password,
            securityQuestion,
            securityAnswer
        };

        try {
            const response = await axios.post('http://localhost:8080/api/user/create', formData);
            console.log(formData);
            alert('Account created successfully');
            navigate('/login');
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="container">
            <div className="login-box">
                <h1 className="login-title">DalTalks</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
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
                    <div className="input-group">
                        <input
                            type="text"
                            value={securityQuestion}
                            onChange={(e) => setSecurityQuestion(e.target.value)}
                            placeholder="Security Question"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            value={securityAnswer}
                            onChange={(e) => setSecurityAnswer(e.target.value)}
                            placeholder="Security Answer"
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Sign Up</button>
                    <div className="error-message">{errorMessage}</div>
                    <div className="extra-links">
                        <p>Already have an account? <Link to="/login">Log in</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;