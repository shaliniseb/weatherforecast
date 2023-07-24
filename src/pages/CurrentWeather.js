import React, { useEffect, useState } from "react";

const CurrentWeather = (props) => {
  let [currentWeather, setCurrentWeather] = useState([]);
  let [place, setPlace] = useState("");

  useEffect(() => {
    getCurrentWeather();
  }, [place]);

  let getCurrentWeather = async () => {
    if (place != "") {
      let response = await fetch("/currentWeather/" + place);
      let data = await response.json();
      setCurrentWeather(data);
    } else {
      const emptyData = {
        status: "500",
        message: "No data found",
      };
      setCurrentWeather(emptyData);
    }
  };

  let noWeatherData = () => {
    return <p className="error">No data found</p>;
  };
  let weatherData = () => {
    return (
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <td>
              <b>Current Weather</b>
            </td>
            <td>{currentWeather.c_weather}</td>
          </tr>
          <tr>
            <td>Weather Description</td>
            <td>{currentWeather.description}</td>
          </tr>
          <tr>
            <td>Current Temperature</td>
            <td>{currentWeather.temp}&deg;C</td>
          </tr>
          <tr>
            <td>Feels Like</td>
            <td>{currentWeather.feel_like}</td>
          </tr>
          <tr>
            <td>Humidity</td>
            <td>{currentWeather.humidity}</td>
          </tr>
        </tbody>
      </table>
    );
  };
  let wdata = "";
  if (currentWeather.status != "200") {
    wdata = noWeatherData();
  } else {
    wdata = weatherData();
  }
  return (
    <div>
      <div className="weather">
        <table>
          <thead>
            <tr>
              <th colSpan={5}>Current Weather Report:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5}>
                <label>Enter Location</label>
                <input
                  placeholder="Enter Location"
                  type="text"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        {wdata}
      </div>
    </div>
  );
};

export default CurrentWeather;
