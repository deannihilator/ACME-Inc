import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import "./service.css";

const Services = () => {
  const navigate = useNavigate();
  const cardsRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleGetInTouchClick = () => {
    navigate("/form");
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === 5 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? 5 : prev - 1));
  };

  // Animation for cards and carousel auto-advance
  useEffect(() => {
    const animateElements = (elements, animationClass) => {
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add(animationClass);
        }, index * 200);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target === cardsRef.current) {
            const cards = cardsRef.current.querySelectorAll(".card");
            animateElements(cards, "card-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (cardsRef.current) observer.observe(cardsRef.current);

    // Auto-advance carousel
    const carouselInterval = setInterval(handleNext, 5000);

    return () => {
      if (cardsRef.current) observer.unobserve(cardsRef.current);
      clearInterval(carouselInterval);
    };
  }, []);

  return (
    <div className="services-page">
      {/* Animated background elements */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="grid-lines"></div>

      <section id="services" className="services">
        <div className="section-header">
          <h2 className="section-title">
            <span className="title-highlight">Our Services</span>
          </h2>
          <p className="section-subtitle">
            We specialize in creating{" "}
            <span className="text-gradient">unforgettable experiences</span>{" "}
            tailored to your needs. From dream weddings to high-energy concerts,
            we ensure every detail is perfect.
          </p>
        </div>

        <div className="service-cards" ref={cardsRef}>
          {[
            {
              title: "Weddings",
              desc: "Make your special day unforgettable with expert planning, stunning décor, and seamless execution.",
              features: [
                "Venue selection & décor",
                "Catering & entertainment",
                "Photography & videography",
                "Customized wedding themes",
              ],
              bgImage:
                "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac",
            },
            {
              title: "Concerts",
              desc: "Create unforgettable musical experiences with seamless event execution.",
              features: [
                "Stage & sound setup",
                "Artist & performer management",
                "Lighting & special effects",
                "Ticketing & crowd management",
              ],
              bgImage:
                "https://images.unsplash.com/photo-1619229665876-f54b2276b7bd",
            },
            {
              title: "Corporate Events",
              desc: "Professional planning for conferences, product launches, and business networking events.",
              features: [
                "Venue booking & logistics",
                "Technology & presentation setup",
                "Catering & team-building",
                "Branding & promotional materials",
              ],
              bgImage:
                "https://images.unsplash.com/photo-1664575602276-acd073f104c1",
            },

            {
              title: "Birthdays",
              desc: "Fun and memorable celebrations for birthdays, anniversaries, and special occasions.",
              features: [
                "Theme-based decorations",
                "Live entertainment & DJs",
                "Custom food & beverage planning",
                "Photo booths & party favors",
              ],
              bgImage:
                "https://plus.unsplash.com/premium_photo-1663839412026-51a44cfadfb8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmlydGhkYXl8ZW58MHx8MHx8fDA%3D",
            },
            {
              title: "Babyshower",
              desc: "Fun and memorable celebrations for birthdays, anniversaries, and special occasions.",
              features: [
                "Theme-based decorations",
                "Live entertainment & DJs",
                "Custom food & beverage planning",
                "Photo booths & party favors",
              ],
              bgImage:
                "https://images.unsplash.com/photo-1617140545010-5533614d98b5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmFieXNob3dlcnxlbnwwfHwwfHx8MA%3D%3D",
            },
            {
              title: "Parties",
              desc: "Fun and memorable celebrations for birthdays, anniversaries, and special occasions.",
              features: [
                "Theme-based decorations",
                "Live entertainment & DJs",
                "Custom food & beverage planning",
                "Photo booths & party favors",
              ],
              bgImage:
                "https://images.unsplash.com/photo-1566737236500-c8ac43014a67",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="card"
              style={{ backgroundImage: `url(${service.bgImage})` }}
            >
              <div className="card-overlay"></div>
              <div className="card-content">
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <ul>
                  {service.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <section id="gallery" className="gallery-carousel">
          <div className="section-header">
            <h2 className="section-title">
              <span className="title-highlight">Event Showcase</span>
            </h2>
            <p className="section-subtitle">
              Explore our <span className="text-gradient">highlights</span>{" "}
              of memorable moments
            </p>
          </div>

          <div className="carousel-container">
            <button className="carousel-nav prev" onClick={handlePrev}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
              </svg>
            </button>

            <div className="carousel-track">
              {[
                {
                  id: 1,
                  img: "https://images.unsplash.com/photo-1531058020387-3be344556be6",
                  title: "Elegant Wedding",
                  desc: "Full-service wedding planning and execution",
                },
                {
                  id: 2,
                  img: "https://images.unsplash.com/photo-1511578314322-379afb476865",
                  title: "Concert Production",
                  desc: "Stage design and artist management",
                },
                {
                  id: 3,
                  img: "https://images.unsplash.com/photo-1642784353476-d226d8d617b3",
                  title: "Corporate Summit",
                  desc: "End-to-end corporate event solutions",
                },
                {
                  id: 4,
                  img: "https://images.unsplash.com/premium_photo-1664790560123-c5f839457591",
                  title: "Birthday Celebration",
                  desc: "Custom themed parties",
                },
                {
                  id: 5,
                  img: "https://images.unsplash.com/premium_photo-1664304095595-e428558e8161",
                  title: "Gala Dinner",
                  desc: "Luxury event experiences",
                },
                {
                  id: 6,
                  img: "https://images.unsplash.com/premium_photo-1661486750841-c02a9d22a1a6",
                  title: "Music Festival",
                  desc: "Large-scale outdoor productions",
                },
              ].map((event, index) => (
                <div
                  key={event.id}
                  className={`carousel-slide ${
                    index === activeIndex ? "active" : ""
                  }`}
                  style={{
                    transform: `translateX(${(index - activeIndex) * 100}%)`,
                  }}
                >
                  <div
                    className="slide-image"
                    style={{ backgroundImage: `url(${event.img})` }}
                  >
                    <div className="slide-content">
                      <h3>{event.title}</h3>
                      <p>{event.desc}</p>
                      <button className="view-more">View Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="carousel-nav next" onClick={handleNext}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </svg>
            </button>
          </div>

          <div className="carousel-dots">
            {[0, 1, 2, 3, 4, 5].map((dot) => (
              <button
                key={dot}
                className={`dot ${dot === activeIndex ? "active" : ""}`}
                onClick={() => setActiveIndex(dot)}
              />
            ))}
          </div>
        </section>

        <div className="cta-section">
          <div className="cta-content">
            <h2>Ready to Plan Your Event?</h2>
            <p>
              Let's bring your vision to life! Contact us today to start
              planning your perfect event.
            </p>
            <button onClick={handleGetInTouchClick} className="cta-button">
              <span>Get in Touch</span>
              <div className="button-hover-effect"></div>
            </button>
          </div>
        </div>
      </section>

      <footer className="services-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <h3>ACME Events</h3>
            <p>Creating unforgettable experiences since 2022</p>
            <div className="social-links">
              {["facebook", "instagram", "twitter", "linkedin"].map(
                (social) => (
                  <a key={social} href="#" aria-label={social}>
                    <i className={`fab fa-${social}`}></i>
                  </a>
                )
              )}
            </div>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              {[
                { name: "Home", path: "/" },
                { name: "Gallery", path: "/gallery" },
                { name: "Testimonials", path: "/testimonials" },
                { name: "About Us", path: "/about-us" },
                { name: "Contact", path: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact Us</h4>
            <ul>
              <li>
                <i className="fas fa-map-marker-alt"></i> #29 Akshaya, Hebbal,
                Bengaluru, India
              </li>
              <li>
                <i className="fas fa-phone"></i> +91 9144147151
              </li>
              <li>
                <i className="fas fa-envelope"></i> info@acmeevents.com
              </li>
              <li>
                <i className="fas fa-clock"></i> Mon-Sat: 9AM - 8PM
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} ACME Enterprises. All rights
            reserved.
          </p>
          <div className="legal-links">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (policy) => (
                <a
                  key={policy}
                  href={`/${policy.toLowerCase().replace(" ", "-")}`}
                >
                  {policy}
                </a>
              )
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Services;
