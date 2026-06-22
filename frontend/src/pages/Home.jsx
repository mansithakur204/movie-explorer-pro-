import { useState } from "react";
import Navbar from "../components/Navbar";
import { searchMovies } from "../services/movieApi";
import MovieCard from "../components/MovieCard";

function Home() {
  const [movieName, setMovieName] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    if (!movieName.trim()) return;

    const data = await searchMovies(movieName);

    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <section className="flex flex-col items-center justify-center text-center px-6 py-24">

        <h1 className="text-4xl md:text-6xl font-bold max-w-4xl">
          Discover Movies,
          Reviews & Recommendations
        </h1>

        <p className="text-gray-400 mt-6 max-w-2xl text-sm md:text-lg">
          Search millions of movies, save your favorites,
          rate films and build your personal movie collection.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mt-10 w-full max-w-2xl">

          <input
            type="text"
            placeholder="Search movies..."
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            className="flex-1 px-5 py-4 rounded-lg bg-zinc-900 border border-zinc-700 outline-none"
          />

          <button
            onClick={handleSearch}
            className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-lg font-semibold w-full md:w-auto"
          >
            Search
          </button>

        </div>

      </section>

      {/* Movies Grid */}

      <div className="max-w-7xl mx-auto px-6 pb-20">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

         {movies.map((movie) => (
  <MovieCard
    key={movie.imdbID}
    movie={movie}
  />
))}

        </div>

      </div>

    </div>
  );
}

export default Home;