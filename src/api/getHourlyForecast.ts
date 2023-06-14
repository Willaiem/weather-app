import axios from "axios";

const getHourlyForecast = async (lat: number, lon: number, days: number) => {
  return await axios
    .get(
      `http://api.weatherapi.com/v1/forecast.json?key=${
        import.meta.env.VITE_WEATHER_API_KEY
      }&q=${lat},${lon}&days=${days}&aqi=no&alerts=no`
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export default getHourlyForecast;
