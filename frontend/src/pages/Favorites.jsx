import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Favorites() {
  const [movies, setMovies] = useState([]);
  const token = localStorage.getItem("token");

  const fetchFavorites = async () => {
    try {
      const response = await fetch("https://movie-explorer-backend-u172.onrender.com/api/favorites", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      const data = await response.json();

      setMovies(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchFavorites();
    }
  }, []);

  const removeFavorite = async (id) => {
    try {
      await fetch(`https://movie-explorer-backend-u172.onrender.com/api/favorites/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      fetchFavorites();
      toast.success("Movie Removed Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const updateRating = async (id, rating) => {
    try {
      await fetch(`https://movie-explorer-backend-u172.onrender.com/api/favorites/${id}/rating`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ rating }),
      });

      fetchFavorites();
    } catch (error) {
      console.log(error);
    }
  };

  const addToWatchlist = async (id) => {
    try {
      await fetch(`https://movie-explorer-backend-u172.onrender.com/api/watchlist/${id}`, {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

  toast.success("Added To Watchlist");
    } catch (error) {
      console.log(error);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-3xl">Please Login First 🔒</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold text-red-500 mb-10">Favorites Page</h1>

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        gap-6
      "
      >
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
              <h2 className="text-xl font-bold">{movie.Title}</h2>

              <p className="text-gray-400">{movie.Year}</p>

              <div className="flex gap-1 mt-3 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => updateRating(movie._id, star)}
                    className="cursor-pointer text-2xl"
                  >
                    {star <= movie.rating ? "⭐" : "☆"}
                  </span>
                ))}
              </div>

              <button
                onClick={() => addToWatchlist(movie._id)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
              >
                📌 Watchlist
              </button>

              <button
                onClick={() => removeFavorite(movie._id)}
                className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
