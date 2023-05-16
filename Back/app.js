const axios = require("axios");
const express = require("express");
const cors = require("cors");

const PORT = 4009;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/movies", async (req, res) => {
  try {
    // Make a request to the movie API
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?api_key=eb5c23df76290f6e2230bc7a3f7ac175"
    );

    // Extract the list of movies from the API response
    const movies = response.data.results;

    // Send the list of movies as the API response
    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//////////////////////////////////////////

// Endpoint for fetching movies by genre
app.get("/movies/genre/:genreId", async (req, res) => {
  try {
    const genreId = req.params.genreId;

    // Make a request to the movie API
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=eb5c23df76290f6e2230bc7a3f7ac175&with_genres=${genreId}`
    );

    // Extract the list of movies from the API response
    const movies = response.data.results;

    // Send the list of movies as the API response
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
