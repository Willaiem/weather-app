import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const SearchSchema = z.string().transform(val => val.replaceAll(/\d/g, '').trim())

export const SearchInput = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const city = SearchSchema.parse(inputValue)
    localStorage.setItem("city", city);

    setInputValue("");

    navigate('/', { replace: false })
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
