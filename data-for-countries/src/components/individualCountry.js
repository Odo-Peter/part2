import { useState, useEffect } from 'react';
import axios from 'axios';

const IndividualCountry = (props) => {
  const [weather, setWeather] = useState([]);

  const url = 'https://api.openweathermap.org/data/2.5/weather?q=';
  const api_key = process.env.REACT_APP_API_KEY;

  const mapped = props.countriesData
    .map((country) => country)
    .filter(
      (val) => val.name.common.toLowerCase().indexOf(props.filterCountry) > -1
    );

  const furtherMapped = mapped.map((c) => c.capital[0]);

  useEffect(() => {
    axios
      .get(`${url}${furtherMapped}&appid=${api_key}&units=metric`)
      .then((res) => {
        setWeather(res.data);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {mapped.map((country) => (
        <div key={country.ccn3}>
          <h2>{country.name.common}</h2>
          <p>Capital {country.capital[0]}</p>
          <p>Area {country.area}</p>

          <h4>languages: </h4>
          <ul>
            {Object.keys(country.languages).map((lang) => (
              <li key={country.languages[lang]}>{country.languages[lang]}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt={country.name.official} />

          {weather.length !== 0 ? (
            <div>
              <h3>Weather in {weather.name}</h3>
              <p>Temperature {weather.main.temp} Celcius</p>
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt={weather.name}
              />
              <p>wind {weather.wind.speed} m/s</p>
            </div>
          ) : (
            weather
          )}
        </div>
      ))}
    </div>
  );
};

export default IndividualCountry;
