import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiOutlineCheck } from "react-icons/ai";

const Welcome = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name) return;
    localStorage.setItem("user", name);
    navigate("/");
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, []);
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
            placeholder="Please enter your name"
            className="input input-bordered w-full max-w-xs mb-5 sm:mr-5"
          />
          <button className="border flex items-center justify-center border-zinc-700 hover:scale-105 transition duration-200 ease-in-out p-3 bg-zinc-900 hover:bg-zinc-950 hover:border-zinc-800 text-zinc-100 rounded-lg w-full sm:w-auto mb-5 text-center">
            <AiOutlineCheck size={25} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Welcome;
