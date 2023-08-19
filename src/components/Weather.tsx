
import { WeatherDetails } from "../api/getWeather";
import { useUnitContext } from "../context/UnitContext";
import { HourlyForecast } from "./HourlyForecast";

type WeatherProps = WeatherDetails

export const Weather = (props: WeatherProps) => {
  const {
    location: { city, country },
    currentDayForecast: { tempC, tempF, windKph, windMph, humidity, indicator }
  } = props

  const { temperatureType } = useUnitContext();


  const [headHumidity, tailHumidity] = humidity.split(' ')

  return (
    <div
      className="bg-zinc-700 border border-zinc-800 relative z-10 rounded-3xl p-3 max-w-4xl mb-5 xl:mr-5 "
    >
      <div className="flex items-center justify-center md:justify-between flex-wrap gap-8 lg:gap-5 p-2">
        <div className="flex flex-col items-center md:items-start">
          <h2 className="font-semibold text-zinc-50 text-4xl mb-1">
            {city}
          </h2>
          <p className="text-zinc-100 text-sm">{country}</p>
        </div>
        <div className="mx-10">
          <h2 className="font-semibold tracking-wide text-zinc-50 text-4xl mb-1">
            {indicator}
            {temperatureType === 'celsius'
              ? tempC
              : tempF}
          </h2>
          <p className="text-zinc-100 text-sm">Temperature</p>
        </div>
        <div className="mx-10">
          <h2 className="font-semibold tracking-wide text-zinc-50 text-4xl mb-1">
            {headHumidity}
            <span className="text-sm">{tailHumidity}</span>
          </h2>
          <p className="text-zinc-100 text-sm">Humidity</p>
        </div>
        <div className="mx-10">
          <h2 className="font-semibold tracking-wide text-zinc-50 text-4xl mb-1">
            {temperatureType === 'celsius'
              ? windKph
              : windMph}
            <span className="text-xs">{temperatureType === 'celsius' ? "km/h" : "mph"}</span>
          </h2>
          <p className="text-zinc-100 text-sm">Wind speed</p>
        </div>
        {<HourlyForecast {...props} />}
      </div>
    </div>
  );
};
