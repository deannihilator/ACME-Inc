import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaFileExport, FaSignOutAlt, FaUsers, FaCalendarAlt } from "react-icons/fa";
import './AdminDashboard.css'; // Ensure this file exists in the same directory

const AdminDashboard = () => {
  const [queries, setQueries] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('bookings');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          navigate('/login');
          return;
        }
  
        console.log('Starting data fetch...'); // Debug log
  
        const [queriesRes, bookingsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/admin/queries', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('http://localhost:5000/api/admin/bookings', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
  
        console.log('Raw API responses:', { queriesRes, bookingsRes }); // Debug log
  
        // Handle different possible response formats
        const getDataFromResponse = (response) => {
          if (!response.data) {
            console.error('No data in response:', response);
            throw new Error('Empty response from server');
          }
          
          // Case 1: Direct array response
          if (Array.isArray(response.data)) {
            return response.data;
          }
          
          // Case 2: { data: [...] } format
          if (response.data.data && Array.isArray(response.data.data)) {
            return response.data.data;
          }
          
          // Case 3: { results: [...] } or similar
          if (typeof response.data === 'object') {
            const arrayKey = Object.keys(response.data).find(key => 
              Array.isArray(response.data[key])
            );
            if (arrayKey) {
              return response.data[arrayKey];
            }
          }
          
          console.error('Unrecognized response format:', response.data);
          throw new Error('Invalid data format received from server');
        };
  
        const queriesData = getDataFromResponse(queriesRes);
        const bookingsData = getDataFromResponse(bookingsRes);
  
        console.log('Processed data:', { queriesData, bookingsData }); // Debug log
  
        setQueries(queriesData);
        setBookings(bookingsData);
        setLoading(false);
      } catch (err) {
        console.error('Full fetch error:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          headers: err.response?.headers
        });
        
        setError(err.response?.data?.message || err.message);
        setLoading(false);
        
        if (err.response?.status === 401) {
          localStorage.removeItem('adminToken');
          navigate('/login');
        }
      }
    };
  
    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  const exportToCSV = (data, filename) => {
    if (!data || data.length === 0) return;
    
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj => 
      Object.values(obj).map(value => 
        typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value
      ).join(',')
    ).join('\n');
    
    const csvContent = `${headers}\n${rows}`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-screen">
        <h2>Data Loading Error</h2>
        <p>{error}</p>
        <div className="debug-info">
          <p>Try these troubleshooting steps:</p>
          <ol>
            <li>Check your network connection</li>
            <li>Verify the backend server is running</li>
            <li>Refresh the page or logout and login again</li>
          </ol>
        </div>
        <button 
          onClick={() => window.location.reload()} 
          className="retry-button"
        >
          Retry
        </button>
        <button 
          onClick={handleLogout} 
          className="logout-button"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        
        <div className="sidebar-menu">
          <button 
            className={`menu-item ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <FaCalendarAlt className="menu-icon" />
            <span>Bookings</span>
          </button>
          
          <button 
            className={`menu-item ${activeTab === 'queries' ? 'active' : ''}`}
            onClick={() => setActiveTab('queries')}
          >
            <FaUsers className="menu-icon" />
            <span>Contact Queries</span>
          </button>
        </div>
        
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-button">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-main-content">
        <header className="admin-toolbar">
          <h1>
            {activeTab === 'bookings' ? 'Service Bookings' : 'Contact Form Submissions'}
          </h1>
          
          <button 
            onClick={() => exportToCSV(activeTab === 'bookings' ? bookings : queries, activeTab)}
            className="export-button"
            disabled={activeTab === 'bookings' ? bookings.length === 0 : queries.length === 0}
          >
            <FaFileExport /> Export to CSV
          </button>
        </header>

        <div className="dashboard-content">
          {activeTab === 'bookings' ? (
            <div className="data-table-container">
              {bookings.length > 0 ? (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Service Type</th>
                      <th>Event Date</th>
                      <th>Details</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking._id}>
                        <td>{booking.name || 'N/A'}</td>
                        <td>{booking.email || 'N/A'}</td>
                        <td>{booking.serviceType || 'N/A'}</td>
                        <td>{booking.eventDate ? new Date(booking.eventDate).toLocaleDateString() : 'N/A'}</td>
                        <td className="details-cell">{booking.additionalDetails || 'None'}</td>
                        <td>
                          <span className={`status-badge ${booking.status || 'pending'}`}>
                            {booking.status || 'Pending'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="no-data">No bookings found</div>
              )}
            </div>
          ) : (
            <div className="data-table-container">
              {queries.length > 0 ? (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Message</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {queries.map((query) => (
                      <tr key={query._id}>
                        <td>{query.name || 'N/A'}</td>
                        <td>{query.email || 'N/A'}</td>
                        <td>{query.phone || 'N/A'}</td>
                        <td className="message-cell">{query.message || 'No message'}</td>
                        <td>{query.createdAt ? new Date(query.createdAt).toLocaleDateString() : 'N/A'}</td>
                        <td>
                          <button className="action-button reply">Reply</button>
                          <button className="action-button archive">Archive</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="no-data">No queries found</div>
              )}
            </div>
          )}
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Total Bookings</h3>
            <p>{bookings.length}</p>
          </div>
          <div className="stat-card">
            <h3>New Queries</h3>
            <p>{queries.filter(q => !q.responded).length}</p>
          </div>
          <div className="stat-card">
            <h3>Upcoming Events</h3>
            <p>{bookings.filter(b => new Date(b.eventDate) > new Date()).length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;