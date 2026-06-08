import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Hit the actual Backend API for login
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      if (response.data.token) {
        alert("Login Successful! 🎉");
        
        // Save Token and User data in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Redirect user to the Dashboard page
        navigate('/dashboard'); 
      }
    } catch (err) {
      // Display error message from server or default message
      alert(err.response?.data?.message || "Login Failed! Please check credentials.");
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial', maxWidth: '300px', margin: '50px auto', border: '1px solid #ccc', borderRadius: '10px' }}>
      <h2>🔐 Login to Task Manager</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label><br/>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px' }} required />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>Password:</label><br/>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px' }} required />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;