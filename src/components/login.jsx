import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', {
        email,
        password
      });
      
      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.token);
        navigate('/components/adminDashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-page__container">
        <h2 className="login-page__title">Admin Login</h2>
        {error && <p className="login-page__error">{error}</p>}
        <form onSubmit={handleLogin} className="login-page__form">
          <div className="login-page__form-group">
            <label htmlFor="login-email" className="login-page__label">
              Email:
            </label>
            <input
              type="email"
              id="login-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-page__input"
              required
            />
          </div>
          <div className="login-page__form-group">
            <label htmlFor="login-password" className="login-page__label">
              Password:
            </label>
            <input
              type="password"
              id="login-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-page__input"
              required
            />
          </div>
          <button type="submit" className="login-page__button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;