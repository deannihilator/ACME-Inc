import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import "./form.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "transparent",
    background: "linear-gradient(135deg, #ff9a9e 0%,rgb(136, 234, 206) 100%)",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    color: "#000",
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

function Form() {
  const [selectedEntity, setSelectedEntity] = useState("vendor"); // Changed to match backend enum
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    eventDate: "",
    additionalDetails: "",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const handleEntityChange = (e) => {
    setSelectedEntity(e.target.value);
    setFormData({
      name: "",
      email: "",
      phone: "",
      serviceType: "",
      eventDate: "",
      additionalDetails: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Map frontend entity values to backend enum values
      const entityTypeMap = {
        vendors: "vendor",
        promoters: "promoter",
        organizers: "organizer"
      };
      
      const entityType = entityTypeMap[selectedEntity] || "vendor";
      
      const response = await axios.post("http://localhost:5000/api/bookings", {
        entityType, // Changed to match backend field name
        ...formData
      });

      setModalMessage("Your booking has been saved successfully! Our team will reach out to you soon.");
      setModalIsOpen(true);
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        serviceType: "",
        eventDate: "",
        additionalDetails: "",
      });
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Failed to submit form. Please try again.";
      setModalMessage(errorMessage);
      setModalIsOpen(true);
      console.error(err);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    navigate("/");
  };

  return (
    <div className="App">
      <h1>Service Booking Form</h1>
      <form onSubmit={handleSubmit}>
        {/* Entity Selection */}
        <div className="entity-selection">
          <label>
            <input
              type="radio"
              name="entity"
              value="vendors"
              checked={selectedEntity === "vendors"}
              onChange={handleEntityChange}
            />
            Vendors
          </label>
          <label>
            <input
              type="radio"
              name="entity"
              value="promoters"
              checked={selectedEntity === "promoters"}
              onChange={handleEntityChange}
            />
            Promoters
          </label>
          <label>
            <input
              type="radio"
              name="entity"
              value="organizers"
              checked={selectedEntity === "organizers"}
              onChange={handleEntityChange}
            />
            Organizers
          </label>
        </div>

        {/* Rest of your form fields remain the same */}
        {/* Common Fields */}
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Entity-Specific Fields */}
        {selectedEntity === "vendors" && (
          <div className="form-group">
            <label>Service Type (Vendors):</label>
            <input
              type="text"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleInputChange}
              placeholder="e.g., Catering, Decorations"
              required
            />
          </div>
        )}

        {selectedEntity === "promoters" && (
          <div className="form-group">
            <label>Promotion Type (Promoters):</label>
            <input
              type="text"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleInputChange}
              placeholder="e.g., Social Media, Flyers"
              required
            />
          </div>
        )}

        {selectedEntity === "organizers" && (
          <div className="form-group">
            <label>Event Type (Organizers):</label>
            <input
              type="text"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleInputChange}
              placeholder="e.g., Wedding, Conference"
              required
            />
          </div>
        )}

        {/* Additional Fields */}
        <div className="form-group">
          <label>Event Date:</label>
          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Additional Details:</label>
          <textarea
            name="additionalDetails"
            value={formData.additionalDetails}
            onChange={handleInputChange}
            placeholder="Any additional information"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>

      {/* Notification Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Notification Modal"
      >
        <h2 style={{ color: "#000" }}>Notification</h2>
        <p style={{ color: "#000" }}>{modalMessage}</p>
        <button
          onClick={closeModal}
          style={{
            backgroundColor: "#ff6f61",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </Modal>
    </div>
  );
}

export default Form;