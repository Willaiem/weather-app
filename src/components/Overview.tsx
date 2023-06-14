import { useQuery } from "react-query";
import { FaTemperatureLow } from "react-icons/fa";
import { FaThinkPeaks } from "react-icons/fa";
import { FaThermometerFull } from "react-icons/fa";
import { WiSunset } from "react-icons/wi";
import getDaysForecast from "../api/getDaysForecast";
import { UnitContext } from "../context/UnitContext";
import { useContext } from "react";
interface WeatherData {
  current: {
    pressure_mb: number;
    feelslike_c: number;
    feelslike_f: number;
  };

  forecast: {
    forecastday: Array<{
      astro: {
        sunrise: string;
        sunset: string;
      };
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        maxtemp_f: number;
        mintemp_f: number;
        condition: {
          icon: string;
        };
      };
    }>;
  };
}

interface WeatherProps {
  city: string;
}
const Overview = ({ city }: WeatherProps) => {
  const { isMetric } = useContext(UnitContext);
  const { data, isLoading, isError } = useQuery<WeatherData>(
    ["days", city],
    () => getDaysForecast(city, 1)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Something went wrong</div>;
  }

  const day = data?.forecast.forecastday[0];

  return (
    <div className="bg-zinc-700 relative z-10 rounded-3xl p-5 lg:max-w-4xl text-zinc-200 mb-5 max-w-md border border-zinc-800">
      <h2 className="font-semibold text-3xl text-zinc-50 md:text-4xl mb-4">
        Overview
      </h2>
      <div className="flex gap-5 justify-center md:justify-between flex-wrap">
        <div className="bg-zinc-900 p-5 rounded-2xl w-[190px] min-h-[170px] flex flex-col items-center justify-around">
          <h2 className="flex items-center text-2xl justify-center">
            <span className="mr-1">
              <FaTemperatureLow />
            </span>
            Max / Min
          </h2>
          <div className="flex flex-row items-center justify-end">
            <p className="font-semibold text-2xl">
              {isMetric
                ? day?.day.maxtemp_c.toFixed()
                : day?.day.maxtemp_f.toFixed()}
              °
            </p>
            <span className="mx-2">/</span>
            <p className="text-gray-300 text-xl">
              {isMetric
                ? day?.day.mintemp_c.toFixed()
                : day?.day.mintemp_f.toFixed()}
              °
            </p>
          </div>
        </div>
        <div className="bg-zinc-900 p-5 rounded-2xl w-[190px] min-h-[170px] flex flex-col items-center justify-around">
          <h2 className="flex items-center text-2xl justify-center">
            <span className="mr-1">
              <FaThinkPeaks />
            </span>
            Pressure
          </h2>
          <div className="flex flex-row items-center justify-end">
            <p className="text-2xl">{data?.current.pressure_mb} hPa</p>
          </div>
        </div>
        <div className="bg-zinc-900 p-5 rounded-2xl w-[190px] min-h-[170px] flex flex-col items-center justify-around">
          <h2 className="flex items-center text-2xl justify-center">
            <span className="mr-1">
              <FaThermometerFull />
            </span>
            Feels Like
          </h2>
          <div className="flex flex-row items-center justify-end">
            <p className="text-2xl">
              {isMetric
                ? data?.current.feelslike_c.toFixed()
                : data?.current.feelslike_f.toFixed()}
              °
            </p>
          </div>
        </div>

        <div className="bg-zinc-900 p-5 rounded-2xl w-[190px] min-h-[170px] flex flex-col items-center justify-between">
          <h2 className="flex items-center text-2xl justify-center">
            <span className="mr-1">
              <WiSunset size={33} />
            </span>
            Sunset
          </h2>
          <div className="flex flex-row items-center">
            <p className="text-2xl">{day?.astro.sunset}</p>
          </div>
          <div className="flex">
            <h3 className="mr-2"> Sunrise</h3>
            <p>{day?.astro.sunrise}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
