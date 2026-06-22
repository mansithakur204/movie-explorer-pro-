const API_KEY = "d014fa57";

export const searchMovies = async (movieName) => {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${movieName}`
  );


  
  const data = await response.json();

  return data;
};

export const getMovieDetails = async (id) => {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
  );

  const data = await response.json();

  return data;
};