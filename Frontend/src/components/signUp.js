import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password || !question || !answer) {
            alert('Please fill in all required fields');
            return;
          }
      
        const formData = {
            email,
            password,
            question,
            answer
        };
      
        try {
          const response = await axios.post('http://localhost:8080/api/signup/create', formData);
          console.log(response.data);
          alert('Account created successfully');
        } catch (error) {
          console.error(error);
          alert('An error occurred. Please try again later');
        }
      };
    
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
        <h2 style={{ marginBottom: '20px' }}>Create Account</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
          <input type="text" name="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
          <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
          <input type="text" name="question" placeholder="Security Question" onChange={(e) => setQuestion(e.target.value)} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
          <input type="text" name="answer" placeholder="Security Answer" onChange={(e) => setAnswer(e.target.value)} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
          
          <button type="submit" style={{ padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#007BFF', color: 'white', cursor: 'pointer' }}>Submit</button>
        </form>
      </div>
    );
    };

export default SignUp;
