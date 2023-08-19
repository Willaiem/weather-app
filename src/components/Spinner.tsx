import { FaSpinner } from "react-icons/fa";

export const Spinner = () => {
  return (
    <div>
      <span className="sr-only" aria-busy>Loading...</span>
      <FaSpinner className="animate-spin text-zinc-300 text-5xl" />
    </div>
  );
};
