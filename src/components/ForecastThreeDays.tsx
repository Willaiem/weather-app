import { useEffect, useState } from "react";
import { WeatherDetails } from "../api/getWeather";
import { useUnitContext } from "../context/UnitContext";
import { getCurrentDay } from "../lib/getCurrentDay";

type WeatherProps = WeatherDetails

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile;
};

export const ForecastThreeDays = ({ daysForecast }: WeatherProps) => {
  const [forecastDaysType, setForecastDaysType] = useState<"three" | "ten">("three");
  const { temperatureType } = useUnitContext();
  const isMobile = useIsMobile();

  const handleForecastDaysType = (type: typeof forecastDaysType) => () => setForecastDaysType(type);

  const highlighted = "bg-[#b3dadd] p-1 sm:p-2 text-xs 2xl:text-sm rounded-full text-zinc-900 font-semibold"
  const unhighlighted = "text-xs 2xl:text-sm p-1 sm:p-2"

  const forecasts = forecastDaysType === 'three' ? daysForecast.threeDays : daysForecast.tenDays;

  return (
    <div className="bg-zinc-700 border border-zinc-800 relative z-10 rounded-3xl p-5 mb-5 w-full max-w-md text-zinc-200 max-h-[240px]">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-semibold text-lg sm:text-xl text-zinc-50 md:text-2xl mr-2 xl:text-3xl 2xl:mr-10">
          Forecast
        </h2>
        <div className="bg-zinc-900 rounded-full p-1">
          <button
            onClick={handleForecastDaysType('three')}
            className={`${forecastDaysType === 'three'
              ? highlighted
              : unhighlighted
              }`}
          >
            3 days
          </button>
          <button
            onClick={handleForecastDaysType('ten')}
            className={`${forecastDaysType === 'ten'
              ? highlighted
              : unhighlighted
              }`}
          >
            10 days
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 overflow-auto max-h-[150px] no-scrollbar">
        <div className="flex flex-col gap-2">
          {
            forecasts.map((forecast, index) =>
              <div key={index} className="bg-zinc-900 p-3 rounded-3xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={forecast.day.weatherIcon}
                      alt={forecast.day.weatherType}
                      className="mx-1 w-12 sm:w-14 2xl:w-16"
                    />
                    <p className="text-zinc-200 text-xl font-semibold md:text-2xl 2xl:text-2xl mt-1">
                      {temperatureType === 'celsius' ? forecast.day.maxtempC : forecast.day.maxtempF}
                    </p>
                    <span className="mx-1 mt-2 2xl:text-xl">/</span>
                    <p className="mt-2 text-lg md:text-xl 2xl:text-xl">
                      {temperatureType === 'celsius' ? forecast.day.mintempC : forecast.day.mintempF}
                    </p>
                  </div>
                  <p className="text-base md:text-xl 2xl:text-xl">
                    {getCurrentDay(forecast.date, isMobile ? "short" : "long")}
                  </p>
                </div>
              </div>)
          }
        </div>
      </div>
    </div>
  );
};
