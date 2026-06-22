const express = require("express");
const router = express.Router();

const Movie = require("../models/Movie");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/favorites", authMiddleware, async (req, res) => {
  try {
    const existingMovie = await Movie.findOne({
      imdbID: req.body.imdbID,
      userId: req.user.id,
    });

    if (existingMovie) {
      return res.status(400).json({
        message: "Movie already in favorites",
      });
    }

    const movie = new Movie({
      ...req.body,
      userId: req.user.id,
    });

    await movie.save();

    res.json({
      message: "Movie Saved Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.get("/favorites", authMiddleware, async (req, res) => {
  const movies = await Movie.find({
    userId: req.user.id,
  });

  res.json(movies);
});

router.get("/watchlist", authMiddleware, async (req, res) => {
  const movies = await Movie.find({
    userId: req.user.id,
    watchlist: true,
  });

  res.json(movies);
});

router.delete("/favorites/:id", authMiddleware, async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);

  res.json({
    message: "Movie Removed Successfully",
  });
});

router.put("/favorites/:id/rating", authMiddleware, async (req, res) => {
  try {
    const { rating } = req.body;

    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { rating },
      { new: true },
    );

    res.json(movie);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.put("/watchlist/:id", authMiddleware, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        watchlist: true,
      },
      { new: true }
    );

    res.json(movie);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;

