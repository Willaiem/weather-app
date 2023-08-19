
import { useContext } from "react";
import HourlyForecast from "./HourlyForecast";
import Spinner from "./Spinner";

interface WeatherProps {
  city: string;
}
export const Weather = ({ city }: WeatherProps) => {

  if (city) {
    return <Spinner />
  }

  const { isMetric } = useContext(UnitContext);



  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div
      // style={{
      //   boxShadow:
      //     "inset 100px 0px 60px -40px rgba(0, 0, 0, 0.5),inset -100px 0px 60px -40px rgba(0, 0, 0, 0.5)",
      // }}
      className="bg-zinc-700 border border-zinc-800 relative z-10 rounded-3xl p-3 max-w-4xl mb-5 xl:mr-5 xl:max-h-[240px]"
    >
      <div className="flex items-center justify-center md:justify-between flex-wrap gap-8 lg:gap-5 p-2">
        <div className="flex flex-col items-center md:items-start">
          <h2 className="font-semibold text-zinc-50 text-4xl mb-1">
            {weather?.location.name}
          </h2>
          <p className="text-zinc-100 text-sm">{country}</p>
        </div>
        <div className="mx-10">
          <h2 className="font-semibold tracking-wide text-zinc-50 text-4xl mb-1">
            {weather?.current.temp_c.toFixed() > 0 ? "+" : "-"}
            {isMetric
              ? weather?.current.temp_c.toFixed()
              : weather?.current.temp_f.toFixed()}
            °
          </h2>
          <p className="text-zinc-100 text-sm">Temperature</p>
        </div>
        <div className="mx-10">
          <h2 className="font-semibold tracking-wide text-zinc-50 text-4xl mb-1">
            {weather?.current.humidity}
            <span className="text-sm">%</span>
          </h2>
          <p className="text-zinc-100 text-sm">Humidity</p>
        </div>
        <div className="mx-10">
          <h2 className="font-semibold tracking-wide text-zinc-50 text-4xl mb-1">
            {isMetric
              ? weather?.current.wind_kph.toFixed()
              : weather?.current.wind_mph.toFixed()}
            <span className="text-xs">{isMetric ? "km/h" : "mph"}</span>
          </h2>
          <p className="text-zinc-100 text-sm">Wind speed</p>
        </div>
        {weather?.location ? <HourlyForecast weatherData={weather} /> : null}
      </div>
    </div>
  );
};
