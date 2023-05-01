import './App.css';
import Form from './Components/Form';
import Calendar from './Components/Calendar';
import useFetchWeather from './Hooks/useFetchWeather';
import { useState } from 'react';

//TODO:

function App() {
  //fetches weather api. Returns request error, api, zipcode
  const { error, weatherData, searchZip } = useFetchWeather();
  //preferred temp from form
  const [prefTemperature, setPrefTemperature] = useState(0);

  //error log
  if (error) console.log('SEARCH FAILED');
  console.log('weatherData', weatherData);

  return (
    <div className="App">
      <div id="instructions">
        <div id="instructions-cont">
          <h1 id="logo">Sanguine</h1>
          <p>
            Feel free to search for your optimum weather for the next 5 days.
            Ideal days will be yellow and turn white the less ideal they become.
            Just input your zip code and ideal temperature.
          </p>
        </div>
      </div>
      <div id="content">
        <Form searchZip={searchZip} setPrefTemperature={setPrefTemperature} />
        <Calendar
          error={error}
          weatherData={weatherData}
          prefTemperature={prefTemperature}
        />
      </div>
    </div>
  );
}

export default App;
