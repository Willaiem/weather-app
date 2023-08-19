import { MapContainer, TileLayer, Popup, } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useQueryClient } from "react-query";
import { CiLocationOn } from "react-icons/ci";
import { useContext } from "react";
import { UnitContext } from "../context/UnitContext";

interface LocationData {
  location: {
    location: {
      lat: number;
      lon: number;
    };
  };
  city: string;
}

interface WeatherProps {
  current: {
    condition: {
      text: string;
    };
    temp_c: number;
    temp_f: number;
    humidity: number;
  };
  location: {
    country: string;
  };
}

const Map = ({ location, city }: LocationData) => {
  const x = location?.location.lat || 0;
  const y = location?.location.lon || 0;
  const z = 9;
  const queryData = useQueryClient();
  const { isMetric } = useContext(UnitContext);
  const data = queryData.getQueryData<WeatherProps>(["weather", city]);

  return (
    <MapContainer
      center={[x, y]}
      zoom={z}
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
        url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${
          import.meta.env.VITE_OPEN_WEATHER_API_KEY
        }`}
        opacity={1.5}
      />

      <Popup position={[x, y]}>
        <div className="flex flex-row items-center">
          <div className="flex items-center">
            <CiLocationOn size={22} />
            <h2 className="ml-1 first-letter:uppercase">
              {city}
              {", "}
              {data?.location.country}
            </h2>
          </div>
        </div>
        <p className="pl-6 m-0">
          {isMetric ? data?.current.temp_c : data?.current.temp_f}°{" "}
          {data?.current.condition.text}
        </p>
        <p className="pl-6 m-0">{data?.current.humidity}% humidity</p>
      </Popup>
    </MapContainer>
  );
};

export default Map;
