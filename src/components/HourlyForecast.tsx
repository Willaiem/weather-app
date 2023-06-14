import { useQuery } from "react-query";
import getHourlyForecast from "../api/getHourlyForecast";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { UnitContext } from "../context/UnitContext";
import { useContext } from "react";

const HourlyForecast = ({ weatherData }: any) => {
  const [cursor, setCursor] = useState("cursor-grab");
  const { isMetric } = useContext(UnitContext);
  const handleGrabbing = () => {
    setCursor("cursor-grabbing");
  };

  const handleGrab = () => {
    setCursor("cursor-grab");
  };

  const lat = weatherData?.location?.lat;
  const lon = weatherData?.location?.lon;
  const days = 2;
  const ref = useRef<HTMLDivElement>(null);

  const {
    data: hourly,
    isLoading,
    error,
  } = useQuery(["hourly", lat, lon], () => getHourlyForecast(lat, lon, days), {
    enabled: Boolean(lat && lon && days),
  });

  const currentHourIndex = new Date().getHours();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Something went wrong</div>;
  }

  const currentHour = hourly?.forecast?.forecastday[0].hour[currentHourIndex];
  const hoursFirstDay = hourly?.forecast?.forecastday[0].hour.slice(
    currentHourIndex + 1
  );
  const hoursSecondDay = hourly?.forecast?.forecastday[1].hour.slice(
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
        className={`flex flex-row gap-5 ${cursor}`}
      >
        <div className="rounded-3xl pointer-events-none bg-[#b3dadd] p-4 flex flex-col items-center justify-center">
          <h3 className="font-semibold">Now</h3>
          <img src={currentHour.condition.icon} alt="weather icon" />
          <span className="font-semibold">
            {isMetric
              ? weatherData?.current.temp_c.toFixed()
              : weatherData?.current.temp_f.toFixed()}
            °
          </span>
        </div>
        {hoursFirstDay.map((hour: any, i: number) => (
          <div
            key={i}
            className="bg-[#b3dadd]  pointer-events-none rounded-3xl p-3 flex flex-col items-center justify-center"
          >
            <h3 className="font-semibold">{hour.time.slice(-5)}</h3>
            <img src={hour.condition.icon} alt="weather icon" />
            <span className="font-semibold">
              {isMetric ? hour.temp_c.toFixed() : hour.temp_f.toFixed()}°
            </span>
          </div>
        ))}
        {hoursSecondDay.map((hour: any, i: number) => (
          <div
            key={i}
            className="bg-[#b3dadd] pointer-events-none rounded-3xl p-3 flex flex-col items-center justify-center"
          >
            <h3 className="font-semibold">{hour.time.slice(-5)}</h3>
            <img src={hour.condition.icon} alt="weather icon" />
            <span className="font-semibold">
              {isMetric ? hour.temp_c.toFixed() : hour.temp_f.toFixed()}°
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default HourlyForecast;
