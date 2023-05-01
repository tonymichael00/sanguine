import React from 'react';
import './Days.css';

const Days = ({ temperature, date, prefTemperature, error }) => {
  let message;
  //limits temperature range above and below preferred temperature
  const temperatureCap = 15;
  //calcs percentage difference between preferred and actual temp
  let tempPercentage = temperature - prefTemperature;
  tempPercentage = Math.abs(tempPercentage);
  if (tempPercentage > temperatureCap) tempPercentage = temperatureCap;
  tempPercentage = tempPercentage / temperatureCap;

  //1st color, 3 values, yellow
  const color11 = 50;
  const color12 = 100;
  const color13 = 50;

  //second color, 3 values, set to white
  const color21 = color11;
  const color22 = color12;
  const color23 = 100;

  //sets the day color. Multiplies percentage with color difference.
  let rColor = color11 - color21;
  let gColor = color12 - color22;
  let bColor = color13 - color23;

  rColor = rColor * tempPercentage;
  gColor = gColor * tempPercentage;
  bColor = bColor * tempPercentage;

  rColor = Math.round(color11 - rColor);
  gColor = Math.round(color12 - gColor);
  bColor = Math.round(color13 - bColor);

  //generates the days and shows a sunglasses emoji when data isn't present,
  //'Error' when there is an error, and temp with color range
  if (error) {
    message = <div className="temperature">Error</div>;
  } else {
    message = (
      <React.Fragment>
        <div className="date">{date}</div>
        <div className="temperature">
          {temperature === undefined ? (
            <div className="emoji">&#x26C5;</div>
          ) : (
            temperature + '°'
          )}
        </div>
      </React.Fragment>
    );
  }

  return (
    <div
      className="day"
      style={{ backgroundColor: `hsl(${rColor},${gColor}%,${bColor}%)` }}
    >
      {message}
    </div>
  );
};

export default Days;
