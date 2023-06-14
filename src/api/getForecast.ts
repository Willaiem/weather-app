import axios from "axios";

const getForecast = async (
  lat: number,
  lon: number,
  days: number,
  unit: string
) => {
  try {
    const response = await axios.get(
      `https://api.open-meteo.com/v1/gfs?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&forecast_days=${days}&temperature_unit=${unit}&timezone=auto&`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default getForecast;
