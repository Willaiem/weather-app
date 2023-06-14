import { CiSearch } from "react-icons/ci";
import { useState } from "react";

const SearchInput = ({ onSearch }: { onSearch: (city: string) => void }) => {
  const [inputValue, setInputValue] = useState("");

  const hasNumbers = (inputValue: string): boolean => {
    const regex = /[0-9]/;
    return regex.test(inputValue);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (hasNumbers(inputValue)) {
      return;
    }
    onSearch(inputValue);
    setInputValue("");
  };
  return (
    <div className="relative  flex items-center text-zinc-200">
      <form onSubmit={handleSubmit} className="flex items-center relative">
        <div className="absolute ml-3 pointer-events-none">
          <CiSearch size={30} />
        </div>
        <input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          type="text"
          placeholder="Search for a city"
          className="bg-zinc-700 pl-12 border border-zinc-800 text-zinc-100 placeholder:text-zinc-400  p-2 rounded-full max-w-[210px]"
        />
      </form>
    </div>
  );
};

export default SearchInput;
