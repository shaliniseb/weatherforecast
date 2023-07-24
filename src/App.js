import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Head from "./components/Head";
import CurrentWeather from "./pages/CurrentWeather";
import NotFoundPage from "./pages/NotFoundPage";
import DayWeather from "./pages/DayWeather";
import Menu from "./components/Menu";
import WeeklyWeather from "./pages/WeeklyWeather";
function App() {
  return (
    <div className="main-container">
      {<Head />}
      <div className="container">
        <div className="app">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Menu />}>
                <Route index element={<CurrentWeather place="London" />} />
                <Route
                  path="dayWeather"
                  element={<DayWeather location="London" />}
                />
                <Route
                  path="weeklyWeather"
                  element={<WeeklyWeather area="London" />}
                />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
