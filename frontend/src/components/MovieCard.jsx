import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  const addToFavorites = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(movie),
      });

      const data = await response.json();

      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-zinc-900 rounded-xl overflow-hidden hover:scale-105 transition duration-300">
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full h-[450px] object-cover cursor-pointer"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/300x450?text=No+Poster";
        }}
      />
      <div className="p-4">
        <h2 className="text-xl font-bold">{movie.Title}</h2>

        <p className="text-gray-400 mt-2">{movie.Year}</p>

        <div className="flex gap-2 mt-4">
          <button
            onClick={addToFavorites}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg cursor-pointer"
          >
            ❤️ Favorite
          </button>

          <button
            onClick={() => navigate(`/movie/${movie.imdbID}`)}
            className="bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded-lg cursor-pointer"
          >
            ℹ️ Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
