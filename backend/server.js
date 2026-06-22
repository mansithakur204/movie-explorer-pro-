const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const mongoose = require("mongoose");
const movieRoutes = require("./routes/movieRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", movieRoutes);
app.use("/api/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected ✅");
})
.catch((err) => {
  console.log(err);
});

app.get("/", (req, res) => {
  res.send("Backend Running Successfully 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});