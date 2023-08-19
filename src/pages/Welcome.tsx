import { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";

export const loader = async () => {
  const user = localStorage.getItem("user")

  if (!user) {
    return redirect('/welcome')
  }

  return null
};


export const Welcome = () => {
  const navigate = useNavigate()
  useLoaderData()

  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const typedName = name.trim();

    if (typedName.length === 0) return;

    localStorage.setItem("user", typedName);
    navigate("/");
  };


  return (
    <div className="min-h-screen w-full   bg-black/90 flex items-center justify-center">
      <div className="border-2 border-zinc-800 bg-zinc-700 p-10 flex flex-col rounded-3xl my-1 shadow-xl mx-5 py-14">
        <h1 className="text-zinc-100 mb-5 text-5xl sm:text-6xl font-bold">
          Welcome
        </h1>
        <form
          className="flex flex-col items-center sm:flex-row"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            min={1}
            placeholder="Please enter your name"
            aria-label="Please enter your name"
            className="input input-bordered w-full max-w-xs mb-5 sm:mr-5"
          />
          <button className="border flex items-center justify-center border-zinc-700 hover:scale-105 transition duration-200 ease-in-out p-3 bg-zinc-900 hover:bg-zinc-950 hover:border-zinc-800 text-zinc-100 rounded-lg w-full sm:w-auto mb-5 text-center">
            <span className="sr-only">Go to the app</span>
            <AiOutlineCheck size={25} />
          </button>
        </form>
      </div>
    </div>
  );
};
