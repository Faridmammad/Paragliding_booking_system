import React, { useState } from 'react';
import '../styles/BookingForm.scss';
import axios from 'axios';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '', surname: '', dob: '', weight: '', height: '',
    email: '', phone: '', additionalInfo: '', healthIssues: 'no',
    healthDescription: '', dates: [], dateInput: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateAdd = () => {
    if (formData.dateInput && !formData.dates.includes(formData.dateInput)) {
      setFormData({
        ...formData,
        dates: [...formData.dates, formData.dateInput],
        dateInput: ''
      });
    }
  };

  const handleDateRemove = (date) => {
    setFormData({
      ...formData,
      dates: formData.dates.filter(d => d !== date)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/bookings`, formData);
      setSubmitStatus('success');
      setFormData({
        name: '', surname: '', dob: '', weight: '', height: '',
        email: '', phone: '', additionalInfo: '', healthIssues: 'no',
        healthDescription: '', dates: [], dateInput: ''
      });
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="booking-container">
      <div className="booking-header">
        <div className="logo">
          <span className="logo-icon">🪂</span>
          <h1>Paragliding Adventures</h1>
        </div>
        <p className="subtitle">Book your sky-high experience today</p>
      </div>

      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h2>Personal Information</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">First Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your first name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="surname">Last Name</label>
              <input
                type="text"
                id="surname"
                name="surname"
                placeholder="Enter your last name"
                value={formData.surname}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="weight">Weight (kg)</label>
              <input
                type="number"
                id="weight"
                name="weight"
                placeholder="70"
                min="30"
                max="150"
                value={formData.weight}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="height">Height (cm)</label>
            <input
              type="number"
              id="height"
              name="height"
              placeholder="175"
              min="120"
              max="220"
              value={formData.height}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Health Information</h2>
          <div className="health-section">
            <label className="health-question">Do you have any health issues that might affect your flight?</label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="healthIssues"
                  value="no"
                  checked={formData.healthIssues === 'no'}
                  onChange={handleChange}
                />
                <span className="radio-custom"></span>
                No, I'm in good health
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="healthIssues"
                  value="yes"
                  checked={formData.healthIssues === 'yes'}
                  onChange={handleChange}
                />
                <span className="radio-custom"></span>
                Yes, I have some concerns
              </label>
            </div>
          </div>
          
          {formData.healthIssues === 'yes' && (
            <div className="form-group">
              <label htmlFor="healthDescription">Please describe your health concerns</label>
              <textarea
                id="healthDescription"
                name="healthDescription"
                placeholder="Please provide details about any medical conditions, medications, or concerns..."
                value={formData.healthDescription}
                onChange={handleChange}
                rows="4"
              />
            </div>
          )}
        </div>

        <div className="form-section">
          <h2>Flight Dates</h2>
          <div className="date-selection">
            <div className="date-input-group">
              <input
                type="date"
                name="dateInput"
                value={formData.dateInput}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
              />
              <button
                type="button"
                onClick={handleDateAdd}
                disabled={!formData.dateInput}
                className="add-date-btn"
              >
                Add Date
              </button>
            </div>
            
            {formData.dates.length > 0 && (
              <div className="selected-dates">
                <h4>Selected Dates:</h4>
                <div className="date-tags">
                  {formData.dates.map((date, idx) => (
                    <span key={idx} className="date-tag">
                      {formatDate(date)}
                      <button
                        type="button"
                        onClick={() => handleDateRemove(date)}
                        className="remove-date-btn"
                        aria-label="Remove date"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="form-section">
          <h2>Additional Information</h2>
          <div className="form-group">
            <label htmlFor="additionalInfo">Any special requests or additional information?</label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              placeholder="Tell us about your experience level, preferences, or any special requirements..."
              value={formData.additionalInfo}
              onChange={handleChange}
              rows="4"
            />
          </div>
        </div>

        {submitStatus && (
          <div className={`submit-status ${submitStatus}`}>
            {submitStatus === 'success' ? (
              <div className="success-message">
                <span className="status-icon">✅</span>
                <div>
                  <h3>Booking Submitted Successfully!</h3>
                  <p>We'll contact you soon to confirm your paragliding adventure.</p>
                </div>
              </div>
            ) : (
              <div className="error-message">
                <span className="status-icon">❌</span>
                <div>
                  <h3>Submission Failed</h3>
                  <p>Please try again or contact us if the problem persists.</p>
                </div>
              </div>
            )}
          </div>
        )}

        <button
          type="submit"
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Book My Adventure'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;