import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  // State for Contact Us form
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submissionStatus, setSubmissionStatus] = useState(null); // To track submission status

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm({ ...contactForm, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send data to the backend
      const response = await axios.post('http://localhost:5000/api/query', contactForm);
      setSubmissionStatus({ success: true, message: response.data.message });
      setContactForm({ name: '', email: '', message: '' }); // Clear form after submission
    } catch (err) {
      setSubmissionStatus({ success: false, message: err.response?.data?.error || 'Failed to submit query' });
    }
  };

  return (
    <div className="Apps">
      {/* Header */}
      <header className="headerr">
        <div className="logo">ACME</div>
        <nav className="nav">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="/service">Services</a></li>
            <li><a href="#contact">Contact</a></li>
            <li>
              <Link to="/login">Login</Link> {/* Add Login link */}
            </li>
          </ul>
        </nav>
        <Link to="/form">
          <button className="cta-buttonn">Book Now</button>
        </Link>
      </header>

      {/* Hero Section */}
      <section className="heroo">
        <div className="hero-contentt">
          <h1>Your Dream Event, Our Expertise</h1>
          <p>We plan, you celebrate!</p>
          <button className="cta-buttonn"><a href="/service">Explore Services</a></button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="about-content about-bg">
          <h2>About Us</h2>
          <p>We are a team of passionate event planners dedicated to making your events extraordinary.</p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Clients Say</h2>
        <div className="testimonial-carousel">
          <blockquote>"Amazing service! Our wedding was perfect!"</blockquote>
          <blockquote>"Highly professional team. Highly recommended!"</blockquote>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={contactForm.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={contactForm.email}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={contactForm.message}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Send Message</button>
        </form>
        {submissionStatus && (
          <div className={`submission-status ${submissionStatus.success ? 'success' : 'error'}`}>
            {submissionStatus.message}
          </div>
        )}
        <div className="contact-details">
          <p>Phone: +91 9144147151/ +91 8550855498</p>
          <p>Email: info@acmeevents.com</p>
          <p>Address: #29Akshaya, 2nd Floor,Vinayaka Layout,Kempapura</p>
            <p>Hebbal, Bengaluru, India</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="social-links">
          <a href="#facebook">Facebook</a>
          <a href="#twitter">Twitter</a>
          <a href="#instagram">Instagram</a>
        </div>
        <p>&copy; 2023 ACME Enterprises. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;