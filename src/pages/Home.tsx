import { Suspense } from "react";
import { Await, redirect, useLoaderData } from "react-router-dom";
import { WeatherDetails, getWeatherDetails } from "../api/getWeather";
import { CurrentDate } from "../components/CurrentDate";
import { ForecastThreeDays } from "../components/ForecastThreeDays";
import { Leaflet } from "../components/Leaflet";
import { Overview } from "../components/Overview";
import { SearchInput } from "../components/SearchInput";
import { Spinner } from "../components/Spinner";
import { UnitToggle } from "../components/UnitToggle";
import { Weather } from "../components/Weather";
import { getCity } from "../lib/getCity";


export const loader = async () => {
  const user = localStorage.getItem("user")

  if (!user) {
    return redirect('/welcome')
  }

  return user
};


export const Home = () => {
  const user = useLoaderData() as string

  return (
    <div className="min-h-screen w-full bg-black/90 p-10">
      <div className="mb-3">
        <div className="flex items-center">
          <h1 className="text-gray-300 text-sm">Hello, {user}</h1>
        </div>
        <div className="flex items-center justify-between max-w-4xl 2xl:max-w-7xl">
          <CurrentDate />
          <SearchInput />
          <UnitToggle />
        </div>
        <div className="flex justify-center items-center w-full mt-48 mx-auto text-center">
          <Suspense
            fallback={<Spinner />}
          >
            <Await
              resolve={getWeatherDetails(getCity())}
              errorElement={
                <div className="flex justify-center items-center w-full mt-48 mx-auto text-center">
                  <h2 className="text-zinc-200 text-4xl">Please enter a valid city.</h2>
                </div>
              }
            >
              {(weatherDetails: WeatherDetails) => (
                <div className="min-h-screen w-full bg-black/90 p-10">
                  <div className="flex flex-col 2xl:flex-row 2xl:max-w-7xl justify-between">
                    <div className="flex flex-col">
                      <Weather  {...weatherDetails} />
                      <Overview {...weatherDetails} />
                    </div>
                    <div className="flex flex-col lg:flex-row lg:gap-5 max-w-4xl 2xl:flex-col 2xl:gap-0">
                      <ForecastThreeDays  {...weatherDetails} />
                      <Leaflet {...weatherDetails} />
                    </div>
                  </div>

                </div>
              )}
            </Await>
          </Suspense>
        </div>
      </div>
    </div >

  );
};
