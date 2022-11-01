import React, { useState } from 'react';
import './Form.css';

const Form = ({ searchZip, setPrefTemperature }) => {
  //zipcode and preferred temperature from the form
  const [zipCode, setZipCode] = useState('');
  const [tempForm, setTempForm] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    searchZip(zipCode);
    setPrefTemperature(tempForm);
    console.log('tempForm', tempForm);
  };

  return (
    <div id="weather-form-container">
      <div className="weather-form">
        <div className="weather-form-header">Weather</div>
        <form className="weather-form-form" onSubmit={onSubmit}>
          <label form="zipCode">Zip Code: </label>
          <input
            type="text"
            required
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
          <label form="temp">Temp (F): </label>
          <input
            type="text"
            required
            value={tempForm}
            onChange={(e) => setTempForm(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
