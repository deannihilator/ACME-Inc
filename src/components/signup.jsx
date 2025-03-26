import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css'; // Import the CSS file for this component

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    // Add sign-up logic here (e.g., API call)
    console.log('Signing up with:', name, email, password);
    navigate('/login'); // Redirect to login page after sign-up
  };

  return (
    <div className="signup-container__wrapper">
      <div className="signup-container__content">
        <h2 className="signup-container__title">Sign Up</h2>
        <form onSubmit={handleSignUp} className="signup-container__form">
          <div className="signup-container__form-group">
            <label className="signup-container__label">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="signup-container__input"
              required
            />
          </div>
          <div className="signup-container__form-group">
            <label className="signup-container__label">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="signup-container__input"
              required
            />
          </div>
          <div className="signup-container__form-group">
            <label className="signup-container__label">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="signup-container__input"
              required
            />
          </div>
          <button type="submit" className="signup-container__button">
            Sign Up
          </button>
        </form>
        <p className="signup-container__footer">
          Already have an account?{' '}
          <Link to="/login" className="signup-container__link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;