import React, { useEffect, useState } from "react";

const WeeklyWeather = (props) => {
  let [weeklyWeather, setWeeklyWeather] = useState([]);
  let [area, setArea] = useState("");

  useEffect(() => {
    getWeeklyWeather();
  }, [area]);

  let getWeeklyWeather = async () => {
    if (area != "") {
      let response = await fetch("/weeklyWeather/" + area);
      let data = await response.json();
      setWeeklyWeather(data);
    } else {
      const emptyData = {
        status: "500",
        message: "No data found",
      };
      setWeeklyWeather(emptyData);
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
          {weeklyWeatherData.map((eachData, index) => {
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
  let weeklyWeatherData = weeklyWeather.data;
  let wdata = "";
  if (weeklyWeather.status != "200") {
    wdata = noWeatherData();
  } else {
    wdata = weatherData();
  }
  return (
    <div>
      <div className="weather">
        <div>
          <h2 style={{ textAlign: "center" }}>Next 7 days Weather Report</h2>
        </div>
        <div className="inputArea">
          <label>Enter Location</label>
          <input
            placeholder="Enter Location"
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </div>
        {wdata}
      </div>
    </div>
  );
};

export default WeeklyWeather;
