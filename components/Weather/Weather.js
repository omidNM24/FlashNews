import React, { useState, useEffect } from "react";
import { BsDropletFill } from "react-icons/bs";
import { BiWind } from "react-icons/bi";
import { MdLocationPin } from "react-icons/md";

const Weather = (props) => {
  const [weatherData, setWeatherData] = useState(false);
  useEffect(() => {
    async function getWeatherData() {
      const res = await fetch(
        "https://api.weatherapi.com/v1/current.json?key=ddc908bc77f049619b354900231106&q=kabul"
      );
      const data = await res.json();
      setWeatherData(data);
    }
    getWeatherData();
  }, []);

  console.log(weatherData);

  if (!weatherData) return <p>loading...</p>;

  return (
    <div className="w-full flex flex-col items-center justify-center bg-w2 border border-dashed border-w1 ">
      <div className="w-full grid grid-cols-2 justify-center items-center p-2">
        <div className="flex flex-col items-center justify-center col-span-1 ">
          <img
            src={weatherData.current.condition.icon}
            alt={weatherData.current.condition.text}
          />
          <h2>{Math.floor(weatherData.current.feelslike_c)} °C</h2>
        </div>
        <div className="w-full flex flex-col justify-center p-2 gap-2 col-span-1 border-r border-w5">
          <h3 className="flex items-center gap-1 text-base m-0 text-b2 tracking-tight">
            <MdLocationPin /> {weatherData.location.name}
          </h3>
          <h3 className="flex items-center gap-1 text-base m-0 text-b2 tracking-tight">
            <BsDropletFill /> {weatherData.current.humidity}%
          </h3>
          <h3 className="flex items-center gap-1 text-base m-0 text-b2 tracking-tight">
            <BiWind /> {weatherData.current.wind_kph} km/h
          </h3>
        </div>
      </div>
      <p className="text-base tracking-tight font-semibold text-b3 m-0">
        {weatherData.current.condition.text}
      </p>
    </div>
  );
};

export default Weather;
