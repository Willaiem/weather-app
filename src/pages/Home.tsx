import { useLoaderData, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Weather } from "../components/Weather";
import CurrentDate from "../components/CurrentDate";
import SearchInput from "../components/SearchInput";
import Overview from "../components/Overview";
import ForecastThreeDays from "../components/ForecastThreeDays";
import { useQuery } from "react-query";
import getWeather from "../api/getWeather";
import Spinner from "../components/Spinner";
import Map from "../components/Map";
import UnitToggle from "../components/UnitToggle";

const Home = () => {
  const navigate = useNavigate();
  const data: unknown = useLoaderData();
  let user;

  if (typeof data === "string") {
    user = data;
  }

  const [city, setCity] = useState("Warsaw");

  useEffect(() => {
    if (!data) {
      navigate("/welcome");
    }
  }, [data]);

  const {
    data: location,
    isLoading,
    isError,
  } = useQuery(["weather", city], () => getWeather(city));

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-black/90 p-10">
        <div className="mb-3">
          <div className="flex items-center">
            <h1 className="text-gray-300 text-sm">Hello, {user}</h1>
          </div>
          <div className="flex items-center justify-between max-w-4xl 2xl:max-w-7xl">
            <CurrentDate />
            <SearchInput onSearch={setCity} />
          </div>
          <div className="flex justify-center items-center w-full mt-48 mx-auto text-center">
            <Spinner />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-black/90 p-10">
      <div className="mb-3 max-w-4xl 2xl:max-w-7xl">
        <div className="flex flex-row items-center justify-between">
          <div>
            <h1 className="text-gray-300 text-sm">Hello, {user}</h1>
            <CurrentDate />
          </div>
          <div className="flex flex-col-reverse  sm:flex-row items-end sm:items-center gap-5 2xl:gap-14">
            <SearchInput onSearch={setCity} />
            <UnitToggle />
          </div>
        </div>
      </div>
      {city && !isError && !isLoading ? (
        <div className="flex flex-col 2xl:flex-row 2xl:max-w-7xl justify-between">
          <div className="flex flex-col">
            <Weather city={city} />
            <Overview city={city} />
          </div>
          <div className="flex flex-col lg:flex-row lg:gap-5 max-w-4xl 2xl:flex-col 2xl:gap-0">
            <ForecastThreeDays city={city} />
            <Map location={location} city={city} />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full mt-48 mx-auto text-center">
          <h1 className="text-zinc-200 text-4xl">Please enter a valid city.</h1>
        </div>
      )}
    </div>
  );
};

export default Home;
