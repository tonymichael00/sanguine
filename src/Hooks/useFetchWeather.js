import axios from 'axios';
import { useState } from 'react';
import ApiKey from '../ApiKey';

const useFetchWeather = () => {
  //fetching latitude, longitude coordinates from openweather api
  const [weatherData, setWeatherData] = useState([{}, {}, {}, {}, {}]);
  const [error, setError] = useState(false);

  const searchZip = (zipCode) => {
    const API_KEY = ApiKey();
    const GEOCODE_URL = `https://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},US&appid=${API_KEY}`;
    console.log('API_KEY', API_KEY);

    //uses zipcode to fetch latitude, longitude coordinates
    const fetchLocation = async () => {
      try {
        const res = await axios.get(GEOCODE_URL);
        console.log('LOCATION REQUESTED');
        console.log('location', res.data);
        setError(false);
        return res.data;
      } catch (err) {
        if (err.res) {
          console.log(err.res.data);
          console.log(err.res.status);
          console.log(err.res.headers);
          setError(true);
        } else {
          console.log(`Error: ${err.message}`);
          setError(true);
        }
      }
    };

    //uses latitude, longitude to fetch weather data
    const fetchForecast = async () => {
      const { lat, lon } = await fetchLocation();
      const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial `;

      try {
        const res = await axios.get(FORECAST_URL);
        console.log('WEATHER REQUESTED');
        const weatherData = res.data;
        console.log('weatherData', weatherData);
        const { list } = weatherData;
        const forecast = list.filter((e, i) => {
          if ((i + 8) % 8 === 0) {
            return true;
          } else return false;
        });

        //formats api data to temp and date
        const filteredForecast = forecast.map((day) => {
          let formatTemp = Math.round(day.main.temp);
          let formatDate = day.dt_txt.slice(8, 10);
          // console.log('formatDate', formatDate);
          return { temperature: formatTemp, date: formatDate };
        });

        console.log('forecast', forecast);
        setWeatherData(filteredForecast);
        console.log('filteredForecast', filteredForecast);
        setError(false);
      } catch (err) {
        if (err.res) {
          console.log(err.res.data);
          console.log(err.res.status);
          console.log(err.res.headers);
          setError(true);
        } else {
          console.log(`Error: ${err.message}`);
          setError(true);
        }
      }
    };

    fetchForecast();

    console.log('useFetchWeather RAN');
  };

  return { error, weatherData, searchZip };
};

export default useFetchWeather;
