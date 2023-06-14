import axios from "axios";

const getDaysForecast = async (city: string, days: number) => {
  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/forecast.json?key=${
        import.meta.env.VITE_WEATHER_API_KEY
      }&q=${city}&days=${days}&aqi=no&alerts=no`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default getDaysForecast;
