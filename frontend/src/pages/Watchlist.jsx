import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Watchlist() {
  const [movies, setMovies] = useState([]);

  const fetchWatchlist = async () => {
    try {
      const response = await fetch(
        "https://movie-explorer-backend-u172.onrender.com/api/watchlist",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      const data = await response.json();

      setMovies(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="p-10">
        <h1 className="text-4xl font-bold text-red-500 mb-10">
          My Watchlist 📌
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="bg-zinc-900 rounded-xl overflow-hidden"
            >
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-[450px] object-cover"
              />

              <div className="p-4">
                <h2 className="text-xl font-bold">
                  {movie.Title}
                </h2>

                <p className="text-gray-400">
                  {movie.Year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Watchlist;