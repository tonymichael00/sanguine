import React from 'react';
import Days from './Components/Days';
import './Calendar.css';

const Calendar = ({ error, weatherData, prefTemperature }) => {
  const daysMap = weatherData.map((day) => (
    <Days
      temperature={day.temperature}
      date={day.date}
      prefTemperature={prefTemperature}
      error={error}
      key={day.date}
    />
  ));

  console.log('daysMap', daysMap);

  return <div className="calendar">{daysMap}</div>;
};

export default Calendar;
