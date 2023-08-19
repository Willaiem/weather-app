import { FaTemperatureLow, FaThermometerFull, FaThinkPeaks } from "react-icons/fa";
import { WiSunset } from "react-icons/wi";
import { WeatherDetails } from "../api/getWeather";
import { useUnitContext } from "../context/UnitContext";

type OverviewProps = WeatherDetails

export const Overview = ({ currentDayForecast }: OverviewProps) => {
  const { temperatureType } = useUnitContext();

  const {
    maxtempC,
    maxtempF,
    mintempC,
    mintempF,
    feelslikeC,
    feelslikeF,
    pressureMb,
    sunrise,
    sunset,
  } = currentDayForecast

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
              {temperatureType === 'celsius'
                ? maxtempC
                : maxtempF}
            </p>
            <span className="mx-2">/</span>
            <p className="text-gray-300 text-xl">
              {temperatureType === 'celsius'
                ? mintempC
                : mintempF}
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
            <p className="text-2xl">{pressureMb}</p>
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
              {temperatureType === 'celsius'
                ? feelslikeC
                : feelslikeF}
            </p>
          </div>
        </div>

        <div className="bg-zinc-900 p-5 rounded-2xl w-[190px] min-h-[170px] flex flex-col items-center justify-between">
          <h2 className="flex items-center text-2xl justify-center">
            <span className="mr-1">
              <WiSunset className="w-[33px] h-[33px]" />
            </span>
            Sunset
          </h2>
          <div className="flex flex-row items-center">
            <p className="text-2xl">{sunset}</p>
          </div>
          <div className="flex">
            <h3 className="mr-2"> Sunrise</h3>
            <p>{sunrise}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
