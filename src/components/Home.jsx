import React, { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  // State for Contact Us form
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
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
      const response = await axios.post(
        "http://localhost:5000/api/query",
        contactForm
      );
      setSubmissionStatus({ success: true, message: response.data.message });
      setContactForm({ name: "", email: "", message: "" }); // Clear form after submission
    } catch (err) {
      setSubmissionStatus({
        success: false,
        message: err.response?.data?.error || "Failed to submit query",
      });
    }
  };

  return (
    <div className="Apps" id="home">
      {/* Header */}
      <header className="headerr">
        <div className="logo">ACME</div>
        <nav className="nav">
          <ul>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="/service">Services</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
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
          <button className="cta-buttonn">
            <a href="/service">Explore Services</a>
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" class="about">
        <div class="tech-orb"></div>
        <div class="tech-orb"></div>

        <div class="about-content">
          <h2>ACME</h2>
          <h3 className="secondd">Crafting Unforgettable Experiences</h3>
          <p>
            At <strong>ACME</strong>, we don't just plan events—we create{" "}
            <strong>
              moments that inspire, connect, and leave lasting impressions
            </strong>
            . As a premier event management company, we blend{" "}
            <strong>innovation, precision, and passion</strong> to turn your
            vision into reality, whether it's a corporate gala, product launch,
            wedding, or immersive brand experience.
          </p>

          <h3>Why Choose Us?</h3>
          <ul>
            <li>
              <strong>Tailored Creativity</strong>: Every event is unique. We
              design custom experiences that reflect your brand's identity or
              personal story.
            </li>
            <li>
              <strong>Seamless Execution</strong>: From concept to cleanup, our
              meticulous planning ensures flawless events, on time and on
              budget.
            </li>
            <li>
              <strong>Tech-Forward Approach</strong>: Leveraging cutting-edge
              tools like virtual reality, interactive installations, and
              AI-driven logistics to wow your guests.
            </li>
            <li>
              <strong>Global Network</strong>: Access to top-tier vendors,
              venues, and talent worldwide for events that stand out.
            </li>
          </ul>

          <h3>Our Story</h3>
          <p>
            Founded in <strong>2015</strong>, we started with a simple mission:{" "}
            <strong>to redefine event excellence</strong>. Today, we've curated{" "}
            <strong>500+ events</strong> across three continents, earning
            accolades for our creativity, reliability, and ability to exceed
            expectations.
          </p>

          <p>
            <strong>Let's create something extraordinary together.</strong>
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Clients Say</h2>
        <div className="testimonial-carousel">
          <blockquote>"Amazing service! Our wedding was perfect!"</blockquote>
          <blockquote>
            "Highly professional team. Highly recommended!"
          </blockquote>
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
          <div
            className={`submission-status ${
              submissionStatus.success ? "success" : "error"
            }`}
          >
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
      <footer class="footer">
        <div class="footer-content">
          <div class="footer-orb orb-1"></div>
          <div class="footer-orb orb-2"></div>
          <div class="social-links">
            <a href="#facebook" class="social-icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
              <span class="social-tooltip">Facebook</span>
            </a>
            <a href="#twitter" class="social-icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
              <span class="social-tooltip">Twitter</span>
            </a>
            <a href="#instagram" class="social-icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              <span class="social-tooltip">Instagram</span>
            </a>
          </div>
          <div class="copyright">
            <p>
              &copy; <span class="year">2023</span>{" "}
              <span class="company-name">ACME Enterprises</span>. All rights
              reserved.
            </p>
            <div class="copyright-underline"></div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
