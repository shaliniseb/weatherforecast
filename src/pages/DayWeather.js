import React, { useEffect, useState } from "react";

const DayWeather = (props) => {
  let [dayWeather, setDayWeather] = useState([]);
  let [location, setLocation] = useState("");

  useEffect(() => {
    getDayWeather();
  }, [location]);

  let getDayWeather = async () => {
    if (location != "") {
      let response = await fetch("/dayWeather/" + location);
      let data = await response.json();
      setDayWeather(data);
    } else {
      const emptyData = {
        status: "500",
        message: "No data found",
      };
      setDayWeather(emptyData);
    }
  };
  let noWeatherData = () => {
    return <p className="error">No data found</p>;
  };
  let weatherData = () => {
    return (
      <table id="hourTable" border={1}>
        <thead>
          <tr>
            <th>Hour</th>
            <th>Weather</th>
            <th>Temperature</th>
          </tr>
        </thead>
        <tbody>
          {}
          {dayWeatherData.map((eachData, index) => {
            return (
              <tr key={index}>
                <td>{eachData.hour}</td>
                <td> {eachData.weather}</td>
                <td> {eachData.temp}&deg;C</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
  let dayWeatherData = dayWeather.data;
  let wdata = "";
  if (dayWeather.status != "200") {
    wdata = noWeatherData();
  } else {
    wdata = weatherData();
  }
  return (
    <div>
      <div className="weather">
        <div>
          <h2 style={{ textAlign: "center" }}>Next 24 Hour Weather Report</h2>
        </div>
        <div className="inputArea">
          <label>Enter Location</label>
          <input
            placeholder="Enter Location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        {wdata}
      </div>
    </div>
  );
};

export default DayWeather;
