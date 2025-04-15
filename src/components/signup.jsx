import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Send data to your backend API
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      // Handle successful registration
      console.log('Registration successful:', response.data);
      navigate('/login'); // Redirect to login page
      
    } catch (err) {
      // Handle errors
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container__wrapper">
      <div className="signup-container__content">
        <h2 className="signup-container__title">Sign Up</h2>
        
        {error && <div className="signup-container__error">{error}</div>}
        
        <form onSubmit={handleSignUp} className="signup-container__form">
          <div className="signup-container__form-group">
            <label className="signup-container__label">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="signup-container__input"
              required
            />
          </div>
          
          <div className="signup-container__form-group">
            <label className="signup-container__label">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="signup-container__input"
              required
            />
          </div>
          
          <div className="signup-container__form-group">
            <label className="signup-container__label">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="signup-container__input"
              required
              minLength="6"
            />
          </div>
          
          <button 
            type="submit" 
            className="signup-container__button"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
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