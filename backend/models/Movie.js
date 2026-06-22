const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  imdbID: String,
  Title: String,
  Year: String,
  Poster: String,

  rating: {
    type: Number,
    default: 0,
  },

  watchlist: {
  type: Boolean,
  default: false,
},

  userId: String,
});

module.exports = mongoose.model("Movie", movieSchema);