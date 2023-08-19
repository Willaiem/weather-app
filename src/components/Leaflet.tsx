import "leaflet/dist/leaflet.css";
import { CiLocationOn } from "react-icons/ci";
import { MapContainer, Popup, TileLayer, } from "react-leaflet";
import { WeatherDetails } from "../api/getWeather";
import { useUnitContext } from "../context/UnitContext";
import { getCity } from "../lib/getCity";

type LeafletProps = WeatherDetails

export const Leaflet = ({
  location,
  weatherType,
  currentDayForecast: {
    tempC,
    tempF,
    humidity,
  } }: LeafletProps) => {
  const { temperatureType } = useUnitContext();

  const city = getCity()

  const x = location.lat
  const y = location.lon
  const zoom = 9;

  return (
    <MapContainer
      center={[x, y]}
      zoom={zoom}
      className="mb-5 rounded-3xl max-w-md border border-zinc-700 2xl:h-[266px] 2xl:w-[400px]"
      scrollWheelZoom={false}
    >
      <TileLayer
        accessToken={`${import.meta.env.VITE_JAWG_ACCESS_TOKEN}`}
        attribution='<a href=\"https://www.jawg.io\" target=\"_blank\">&copy; Jawg</a> - <a href=\"https://www.openstreetmap.org\" target=\"_blank\">&copy; OpenStreetMap</a>&nbsp;contributors'
        url="https://tile.jawg.io/a2f1db10-0a98-430f-b010-28f59d50cef1/{z}/{x}/{y}{r}.png?access-token={accessToken}"
      />
      <TileLayer
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY
          }`}
        opacity={1.5}
      />

      <Popup position={[x, y]}>
        <div className="flex flex-row items-center">
          <div className="flex items-center">
            <CiLocationOn size={22} />
            <h2 className="ml-1 first-letter:uppercase">
              {`${city}, ${location.country}`}
            </h2>
          </div>
        </div>
        <p className="pl-6 m-0">
          {temperatureType === 'celsius' ? tempC : tempF}
          {weatherType}
        </p>
        <p className="pl-6 m-0">{humidity} humidity</p>
      </Popup>
    </MapContainer>
  );
};
