import { useContext } from "react";
import { UnitContext } from "../context/UnitContext";
const UnitToggle = () => {
  const { isMetric, toggleUnit } = useContext(UnitContext);

  return (
    <div className="bg-zinc-700 rounded-full border border-zinc-800 p-1 flex items-center justify-between 2xl:transform 2xl:translate-x-9">
      <button
        onClick={toggleUnit}
        className={`${
          isMetric
            ? "bg-[#b3dadd] p-1 px-3   rounded-full text-zinc-900  font-bold"
            : "p-1 px-3 text-zinc-200"
        }`}
      >
        °C
      </button>
      <button
        onClick={toggleUnit}
        className={`${
          isMetric
            ? " text-zinc-200 p-1 px-3"
            : "bg-[#b3dadd] px-3 p-1 rounded-full text-zinc-900  font-bold"
        }`}
      >
        °F
      </button>
    </div>
  );
};

export default UnitToggle;
