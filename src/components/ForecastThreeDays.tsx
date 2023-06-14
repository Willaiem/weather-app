import { useState, useContext, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import getForecast from "../api/getForecast";
import { UnitContext } from "../context/UnitContext";
import getDayName from "../utils/forecastDate";

interface QueryData {
  location: {
    lat: number | undefined;
    lon: number | undefined;
  };
}
interface WeatherProps {
  city: string;
}
const ForecastThreeDays = ({ city }: WeatherProps) => {
  const [toggle, setToggle] = useState(true);
  const [days, setDays] = useState(4);
  const queryClient = useQueryClient();
  const { isMetric } = useContext(UnitContext);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const unit = isMetric ? "celsius" : "fahrenheit";

  const queryData = queryClient.getQueryData<QueryData>(["weather", city]);

  const lat = queryData?.location?.lat;
  const lon = queryData?.location?.lon;

  if (!lat || !lon) return <div>Loading...</div>;

  const {
    data: forecast,
    isLoading,
    isError,
  } = useQuery(
    ["forecast", lat, lon, days, unit],
    () => getForecast(lat, lon, days, unit),
    {
      enabled: Boolean(lat && lon && days && unit),
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  const { temperature_2m_max, temperature_2m_min, time, weathercode } =
    forecast.daily;

  const handleToggle = () => {
    if (!toggle) {
      setDays(4);
    } else {
      setDays(11);
    }
    setToggle(!toggle);
    queryClient.invalidateQueries(["days", city, days]);
  };

  return (
    <div className="bg-zinc-700 border border-zinc-800 relative z-10 rounded-3xl p-5 mb-5 w-full max-w-md text-zinc-200 max-h-[240px]">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-semibold text-lg sm:text-xl text-zinc-50 md:text-2xl mr-2 xl:text-3xl 2xl:mr-10">
          Forecast
        </h2>
        <div className="bg-zinc-900 rounded-full p-1">
          <button
            onClick={handleToggle}
            className={`${
              toggle
                ? "bg-[#b3dadd] p-1 sm:p-2 text-xs 2xl:text-sm rounded-full text-zinc-900  font-semibold"
                : "text-xs 2xl:text-sm p-1 sm:p-2"
            }`}
          >
            3 days
          </button>
          <button
            onClick={handleToggle}
            className={`${
              toggle
                ? "text-xs 2xl:text-sm p-1 sm:p-2"
                : "bg-[#b3dadd] p-1 sm:p-2 text-xs 2xl:text-sm rounded-full text-zinc-900  font-semibold"
            }`}
          >
            10 days
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 overflow-auto max-h-[150px] no-scrollbar">
        <div className="flex flex-col gap-2">
          {Array.from({ length: days }, (_, i) => (
            <div key={i} className="bg-zinc-900 p-3 rounded-3xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={`/${weathercode[i]}.png`}
                    alt="weather icon"
                    className="mx-1 w-12 sm:w-14 2xl:w-16"
                  />
                  <p className="text-zinc-200 text-xl font-semibold md:text-2xl 2xl:text-2xl mt-1">
                    {temperature_2m_max[i].toFixed()}°
                  </p>
                  <span className="mx-1 mt-2 2xl:text-xl">/</span>
                  <p className="mt-2 text-lg md:text-xl 2xl:text-xl">
                    {temperature_2m_min[i].toFixed()}°
                  </p>
                </div>
                <p className="text-base md:text-xl 2xl:text-xl mr-3">
                  {width < 420
                    ? getDayName(time[i]).slice(0, 3)
                    : getDayName(time[i])}
                </p>
              </div>
            </div>
          )).slice(1)}
        </div>
      </div>
    </div>
  );
};

export default ForecastThreeDays;
