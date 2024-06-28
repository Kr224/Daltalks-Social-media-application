import React, { useState } from 'react';
import axios from 'axios';
import '../ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [securityAnswer, setSecurityAnswer] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [resetToken, setResetToken] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [resetSuccessMessage, setResetSuccessMessage] = useState('');

    const handleVerification = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/user/forgotPassword', { email, securityAnswer });
            const { resetToken } = response.data;
            setResetToken(resetToken);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.response.data.message || 'An error occurred. Please try again.');
            setResetToken(null);
        }
    };

    const handlePasswordReset = async (event) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            setErrorMessage('Passwords do not match. Please try again.');
            return;
        }

        try {
            await axios.post('http://localhost:8080/api/user/resetPassword', { resetToken, newPassword });
            setResetToken(null);
            setNewPassword('');
            setConfirmPassword('');
            setResetSuccessMessage('Password reset successful!');
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.response.data.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="container">
            <div className="forgot-password-box">
                <h1 className="forgot-password-title">Forgot Password</h1>
                {resetToken ? (
                    <form onSubmit={handlePasswordReset}>
                        <div className="input-group">
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="New Password"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm Password"
                                required
                            />
                        </div>
                        <button type="submit" className="submit-button">Reset Password</button>
                        <div className="error-message">{errorMessage}</div>
                        <div className="success-message">{resetSuccessMessage}</div>
                    </form>
                ) : (
                    <form onSubmit={handleVerification}>
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
                                type="text"
                                value={securityAnswer}
                                onChange={(e) => setSecurityAnswer(e.target.value)}
                                placeholder="Security Answer"
                                required
                            />
                        </div>
                        <button type="submit" className="submit-button">Verify Identity</button>
                        <div className="error-message">{errorMessage}</div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
