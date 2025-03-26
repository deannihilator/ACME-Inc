import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './service.css'; // Ensure you have this CSS file for styling

const Services = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const galleryRef = useRef(null); // Ref for the gallery section

  // Function to handle button click
  const handleGetInTouchClick = () => {
    navigate('/form'); // Redirect to the /form route
  };

  // Animation for the gallery section
  useEffect(() => {
    const galleryImages = galleryRef.current.querySelectorAll('img');

    // Function to add the 'visible' class to each image with a delay
    const animateGallery = () => {
      galleryImages.forEach((img, index) => {
        setTimeout(() => {
          img.classList.add('visible');
        }, index * 300); // Delay each image by 300ms
      });
    };

    // Trigger the animation when the gallery section is in the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateGallery();
            observer.unobserve(entry.target); // Stop observing after animation
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    // Cleanup observer
    return () => {
      if (galleryRef.current) {
        observer.unobserve(galleryRef.current);
      }
    };
  }, []);

  return (
    <>
      <section id="services" className="services">
        <h2>Our Services</h2>
        <p>
          We specialize in creating unforgettable experiences tailored to your needs. From dream weddings to high-energy concerts, corporate gatherings, and private parties, we ensure every detail is perfect. Explore our services and let’s make magic happen!
        </p>

        <div className="service-cards">
          <div className="card" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2VkZGluZ3N8ZW58MHx8MHx8fDA%3D)" }}>
            <div className="card-content">
              <h3>Weddings</h3>
              <p>Make your special day unforgettable with expert planning, stunning décor, and seamless execution.</p>
              <ul>
                <li>Venue selection & décor</li>
                <li>Catering & entertainment</li>
                <li>Photography & videography</li>
                <li>Customized wedding themes</li>
              </ul>
            </div>
          </div>

          <div className="card" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1619229665876-f54b2276b7bd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uY2VydHN8ZW58MHx8MHx8fDA%3D)" }}>
            <div className="card-content">
              <h3>Concerts</h3>
              <p>Create unforgettable musical experiences with seamless event execution.</p>
              <ul>
                <li>Stage & sound setup</li>
                <li>Artist & performer management</li>
                <li>Lighting & special effects</li>
                <li>Ticketing & crowd management</li>
              </ul>
            </div>
          </div>

          <div className="card" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1664575602276-acd073f104c1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvcnBvcmF0ZXxlbnwwfHwwfHx8MA%3D%3D)" }}>
            <div className="card-content">
              <h3>Corporate Events</h3>
              <p>Professional planning for conferences, product launches, and business networking events.</p>
              <ul>
                <li>Venue booking & logistics</li>
                <li>Technology & presentation setup</li>
                <li>Catering & team-building activities</li>
                <li>Branding & promotional materials</li>
              </ul>
            </div>
          </div>

          <div className="card" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBhcnRpZXN8ZW58MHx8MHx8fDA%3D)" }}>
            <div className="card-content">
              <h3>Parties</h3>
              <p>Fun and memorable celebrations for birthdays, anniversaries, and special occasions.</p>
              <ul>
                <li>Theme-based decorations</li>
                <li>Live entertainment & DJs</li>
                <li>Custom food & beverage planning</li>
                <li>Photo booths & party favors</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <section id="gallery" className="gallery" ref={galleryRef}>
          <h2>Our Work in Action</h2>
          <p>Take a look at some of the memorable events we’ve organized.</p>
          <div className="gallery-grid">
            <img src="https://images.unsplash.com/photo-1531058020387-3be344556be6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGV2ZW50c3xlbnwwfHwwfHx8MA%3D%3D" alt="Wedding setup" />
            <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGV2ZW50c3xlbnwwfHwwfHx8MA%3D%3D" alt="Live concert" />
            <img src="https://images.unsplash.com/photo-1642784353476-d226d8d617b3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fGV2ZW50c3xlbnwwfHwwfHx8MA%3D%3D" alt="Corporate event stage" />
            <img src="https://plus.unsplash.com/premium_photo-1664790560123-c5f839457591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGV2ZW50c3xlbnwwfHwwfHx8MA%3D%3D" alt="Birthday celebration" />
            <img src="https://plus.unsplash.com/premium_photo-1664304095595-e428558e8161?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fGV2ZW50c3xlbnwwfHwwfHx8MA%3D%3D" alt="Glamorous wedding night" />
            <img src="https://plus.unsplash.com/premium_photo-1661486750841-c02a9d22a1a6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGV2ZW50c3xlbnwwfHwwfHx8MA%3D%3D" alt="Outdoor music festival" />
            <img src="https://images.unsplash.com/photo-1628436710620-f505080824f5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fGV2ZW50c3xlbnwwfHwwfHx8MA%3D%3D" alt="Outdoor music festival" />
            <img src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGV2ZW50fGVufDB8fDB8fHww" alt="Event setup" />
          </div>
        </section>

        {/* Call to Action */}
        <div className="cta">
          <h2>Ready to Plan Your Event?</h2>
          <p>Let’s bring your vision to life! Contact us today to start planning your perfect event.</p>
          <button onClick={handleGetInTouchClick} className="cta-button">
            Get in Touch
          </button>
        </div>
        <footer className="services-footer">
  <div className="footer-container">
    <div className="footer-brand">
      <h3>ACME Events</h3>
      <p>Creating unforgettable experiences since 2010</p>
      <div className="social-links">
        <a href="#" aria-label="Facebook"><i className=""></i></a>
        <a href="#" aria-label="Instagram"><i className=""></i></a>
        <a href="#" aria-label="Twitter"><i className=""></i></a>
        <a href="#" aria-label="LinkedIn"><i className=""></i></a>
      </div>
    </div>

    <div className="footer-links">
      <h4>Quick Links</h4>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#gallery">Gallery</a></li>
        <li><a href="/testimonials">Testimonials</a></li>
        <li><a href="/about">About Us</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </div>
    <div className="footer-contact">
      <h4>Contact Us</h4>
      <ul>
        <li><i className="fas fa-map-marker-alt"></i> #29 Akshaya, Hebbal,Bengaluru,India</li>
        <li><i className="fas fa-phone"></i> +91 9144147151</li>
        <li><i className="fas fa-envelope"></i> info@acmeevents.com</li>
        <li><i className="fas fa-clock"></i> Mon-Sat: 9AM - 8PM</li>
      </ul>
    </div>
  </div>

  <div className="footer-bottom">
    <p>&copy; {new Date().getFullYear()} ACME Enterprises. All rights reserved.</p>
    <div className="legal-links">
      <a href="/privacy">Privacy Policy</a>
      <a href="/terms">Terms of Service</a>
      <a href="/cookies">Cookie Policy</a>
    </div>
  </div>
</footer>
      </section>
    </>
  );
};

export default Services;