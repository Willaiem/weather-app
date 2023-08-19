import { motion } from "framer-motion";
import { ElementRef, useRef, useState } from "react";
import { WeatherDetails } from "../api/getWeather";
import { useUnitContext } from "../context/UnitContext";

type HourlyForecastProps = WeatherDetails

export const HourlyForecast = (
  {
    currentDayForecast: { hourlyForecast, tempC, tempF, },
    daysForecast: { threeDays: [nextDay] }
  }: HourlyForecastProps) => {
  const { temperatureType } = useUnitContext();

  const [isCursorGrabbing, setIsCursorGrabbing] = useState(false);

  const handleGrabbing = () => {
    setIsCursorGrabbing(true);
  };

  const handleGrab = () => {
    setIsCursorGrabbing(false);
  };

  const ref = useRef<ElementRef<'div'>>(null);

  const currentHourIndex = new Date().getHours();

  const { weatherIcon, weatherType } = hourlyForecast[currentHourIndex];

  const hoursFirstDay = hourlyForecast.slice(
    currentHourIndex + 1
  );
  const hoursSecondDay = nextDay.hourlyForecast.slice(
    0,
    currentHourIndex
  );


  return (
    <div className="flex flex-wrap overflow-scroll no-scrollbar" ref={ref}>
      <motion.div
        onMouseDown={handleGrabbing}
        onMouseUp={handleGrab}
        drag="x"
        dragConstraints={ref}
        className={`flex flex-row gap-5 ${isCursorGrabbing ? "cursor-grabbing" : "cursor-grab"}`}
      >
        <div className="rounded-3xl pointer-events-none bg-[#b3dadd] p-4 flex flex-col items-center justify-center">
          <h3 className="font-semibold">Now</h3>
          <img src={weatherIcon} alt={weatherType} />
          <span className="font-semibold">
            {temperatureType === 'celsius'
              ? tempC
              : tempF}
          </span>
        </div>
        {[hoursFirstDay, hoursSecondDay].map((hour) => hour.map((day, index) => (
          <div
            key={index}
            className="bg-[#b3dadd] pointer-events-none rounded-3xl p-3 flex flex-col items-center justify-center"
          >
            <h3 className="font-semibold">{day.time} {index}</h3>
            <img src={day.weatherIcon} alt={day.weatherType} />
            <span className="font-semibold">
              {temperatureType === 'celsius' ? day.tempC : day.tempF}
            </span>
          </div>
        )))}
      </motion.div>
    </div>
  );

};
