import { useUnitContext } from "../context/UnitContext";

export const UnitToggle = () => {
  const { temperatureType, setTemperatureType } = useUnitContext();

  const highlighted = "bg-[#b3dadd] p-1 px-3 rounded-full text-zinc-900 font-bold";
  const unhighlighted = "p-1 px-3 text-zinc-200";

  return (
    <div className="bg-zinc-700 rounded-full border border-zinc-800 p-1 flex items-center justify-between 2xl:transform 2xl:translate-x-9">
      <button
        onClick={setTemperatureType('celsius')}
        className={`${temperatureType === 'celsius'
          ? highlighted
          : unhighlighted
          }`}
      >
        °C
      </button>
      <button
        onClick={setTemperatureType('fahrenheit')}
        className={`${temperatureType === 'fahrenheit'
          ? highlighted
          : unhighlighted
          }`}
      >
        °F
      </button>
    </div>
  );
};
