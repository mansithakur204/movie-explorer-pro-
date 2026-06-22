import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/movieApi";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    const data = await getMovieDetails(id);

    setMovie(data);
  };

  if (!movie) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-full rounded-xl"
        />

        <div>

          <h1 className="text-5xl font-bold text-red-500">
            {movie.Title}
          </h1>

          <p className="mt-4 text-xl">
            ⭐ IMDb Rating: {movie.imdbRating}
          </p>

          <p className="mt-2">
            📅 Year: {movie.Year}
          </p>

          <p className="mt-2">
            🎭 Genre: {movie.Genre}
          </p>

          <p className="mt-2">
            ⏱ Runtime: {movie.Runtime}
          </p>

          <p className="mt-2">
            🎬 Director: {movie.Director}
          </p>

          <p className="mt-2">
            👥 Actors: {movie.Actors}
          </p>

          <p className="mt-6 text-gray-300 leading-8">
            {movie.Plot}
          </p>

        </div>

      </div>

    </div>
  );
}

export default MovieDetails;