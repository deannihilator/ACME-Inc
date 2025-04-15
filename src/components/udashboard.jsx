import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const userData = JSON.parse(localStorage.getItem('user'));
        
        if (!token || !userData) {
          navigate('/login');
          return;
        }

        setUser(userData);
        
        // Fetch user's bookings
        const response = await axios.get(`http://localhost:5000/api/bookings/user/${userData._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="dashboard-dropdown">
      <div className="user-profile">
        <span>Welcome, {user?.name}</span>
        <div className="dropdown-content">
          <div className="user-info">
            <p>{user?.email}</p>
            <h4>Your Bookings:</h4>
            {bookings.length > 0 ? (
              <ul className="booking-list">
                {bookings.map(booking => (
                  <li key={booking._id}>
                    <p>Event: {booking.eventName}</p>
                    <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
                    <p>Status: {booking.status}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No bookings yet</p>
            )}
          </div>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;