import axios from "axios";

const getWeather = async (city: string) => {
  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${
        import.meta.env.VITE_WEATHER_API_KEY
      }&q=${city}&aqi=no`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default getWeather;
