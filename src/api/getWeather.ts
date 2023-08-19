import axios from "axios";
import { z } from "zod";
import { camelCasefyObj } from "../lib/camelCasefyObj";
import { transformToError } from "../lib/transformToError";

const weatherDetailsSchema = z.object({
  location: z.object({
    lat: z.number(),
    lon: z.number(),
    name: z.string(),
    country: z.string(),
  }),
  forecast: z.object({
    forecastday: z.array(

      z.object({
        date: z.string(),

        day: z.object({
          maxtempC: z.number().transform((val) => `${val.toFixed()} °`),
          maxtempF: z.number().transform((val) => `${val.toFixed()} °`),
          mintempC: z.number().transform((val) => `${val.toFixed()} °`),
          mintempF: z.number().transform((val) => `${val.toFixed()} °`),
          condition: z.object({
            text: z.string(),
            icon: z.string().transform((val) => `https:${val}`),
          })
        }).transform(val => {
          const { condition, ...rest } = val
          return { ...rest, weatherType: condition.text, weatherIcon: condition.icon };
        }),

        astro: z.object({
          sunrise: z.string(),
          sunset: z.string(),
        }),

        hour: z.array(z.object({
          time: z.string().transform((val) => val.slice(11, 16)),
          tempC: z.number().transform((val) => `${val.toFixed()} °`),
          tempF: z.number().transform((val) => `${val.toFixed()} °`),
          condition: z.object({
            text: z.string(),
            icon: z.string().transform((val) => `https:${val}`),
          })
        }).transform(val => {
          const { condition, ...rest } = val
          return { ...rest, weatherType: condition.text, weatherIcon: condition.icon };
        }))
      }).transform(val => {
        const { hour, ...rest } = val

        return {
          ...rest,
          hourlyForecast: hour
        }
      })

    )
  }),
  current: z.object({
    pressureMb: z.number().transform((val) => `${val.toFixed()} hPa`),
    feelslikeC: z.number().transform((val) => `${val.toFixed()} °`),
    feelslikeF: z.number().transform((val) => `${val.toFixed()} °`),
    tempC: z.number().transform((val) => `${val.toFixed()} °`),
    tempF: z.number().transform((val) => `${val.toFixed()} °`),
    humidity: z.number().transform((val) => `${val.toFixed()} %`),
    windMph: z.number(),
    windKph: z.number(),
    condition: z.object({
      text: z.string(),
    })
  }),
}).transform(weather => {
  const { condition, ...current } = weather.current
  const { name, ...location } = weather.location

  const START_INDEX = 1
  const THREE_DAYS = 3 + START_INDEX
  const TEN_DAYS = 10 + START_INDEX

  const [tempCHead] = current.tempC.split(" ")

  return {
    location: {
      city: name,
      ...location,
    },
    currentDayForecast: {
      indicator: Number(tempCHead) > 0 ? "+" : "-",
      hourlyForecast: weather.forecast.forecastday[0].hourlyForecast,
      ...weather.forecast.forecastday[0].day,
      ...weather.forecast.forecastday[0].astro,
      ...current,
    },
    daysForecast: {
      threeDays: weather.forecast.forecastday.slice(START_INDEX, THREE_DAYS),
      tenDays: weather.forecast.forecastday.slice(START_INDEX, TEN_DAYS),
    },
    weatherType: condition.text,
  };
})

export type WeatherDetails = z.infer<typeof weatherDetailsSchema>

export const getWeatherDetails = async (city: string) => {
  const params = new URLSearchParams({
    key: import.meta.env.VITE_WEATHER_API_KEY,
    q: city,
    days: "11", // 10 days + current day
    aqi: "no",
    alerts: "no",
  })

  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?${params}`
    );

    const camelCasedData = camelCasefyObj(response.data)
    const data = await weatherDetailsSchema.parseAsync(camelCasedData)

    return data
  } catch (error) {
    throw transformToError(error)
  }
};
