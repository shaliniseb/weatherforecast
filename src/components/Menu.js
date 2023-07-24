import React from "react";
import { Outlet, Link } from "react-router-dom";

const Menu = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Current Weather</Link>
          </li>
          <li>
            <Link to="/dayWeather">Next 24 Hours</Link>
          </li>
          <li>
            <Link to="/weeklyWeather">Next 7 Days</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Menu;
