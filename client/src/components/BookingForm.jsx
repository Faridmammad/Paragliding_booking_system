import React, { useState } from 'react';
import '../styles/BookingForm.scss';
import axios from 'axios';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '', surname: '', dob: '', weight: '', height: '',
    email: '', phone: '', additionalInfo: '', healthIssues: 'no',
    healthDescription: '', dates: [], dateInput: ''
  });

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
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/bookings`, formData);
      
      alert('Booking submitted!');
    } catch (err) {
      alert('Error submitting booking.');
    }
  };

  return (
    
    <form className="booking-form" onSubmit={handleSubmit}>
          <h2>Paragliding Booking Form</h2>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="text" name="surname" placeholder="Surname" onChange={handleChange} required />
      <input type="date" name="dob" onChange={handleChange} required />
      <input type="number" name="weight" placeholder="Weight (kg)" onChange={handleChange} required />
      <input type="number" name="height" placeholder="Height (cm)" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="tel" name="phone" placeholder="Mobile Phone" onChange={handleChange} required />
      <textarea name="additionalInfo" placeholder="Additional info" onChange={handleChange}></textarea>

      <div className="health-section">
        <label>Do you have any health issues?</label>
        <label><input type="radio" name="healthIssues" value="yes" onChange={handleChange} /> Yes</label>
        <label><input type="radio" name="healthIssues" value="no" onChange={handleChange} defaultChecked /> No</label>
      </div>
      {formData.healthIssues === 'yes' && (
        <textarea name="healthDescription" placeholder="Please describe" onChange={handleChange}></textarea>
      )}

      <div className="date-selection">
        <input type="date" name="dateInput" value={formData.dateInput} onChange={handleChange} />
        <button type="button" onClick={handleDateAdd}>Add Date</button>
        <div className="selected-dates">
          {formData.dates.map((date, idx) => (
            <span key={idx}>
              {date} <button type="button" onClick={() => handleDateRemove(date)}>x</button>
            </span>
          ))}
        </div>
      </div>

      <button type="submit">Submit Booking</button>
    </form>
  );
};

export default BookingForm;