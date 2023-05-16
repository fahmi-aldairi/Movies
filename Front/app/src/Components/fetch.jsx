import { useEffect, useState } from "react";
import axios from "axios";

function Fetch() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedGenres, setSelectedGenres] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    handleSearch(search);
  }, [search]);

  useEffect(() => {
    if (selectedGenres === "") {
      setFilteredMovies(movies);
    } else {
      fetchMoviesByGenre(selectedGenres);
    }
  }, [selectedGenres]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:4009/movies");
      const moviesData = response.data;
      setMovies(moviesData);
      setFilteredMovies(moviesData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMoviesByGenre = async (genreId) => {
    try {
      const response = await axios.get(
        `http://localhost:4009/movies/genre/${genreId}`
      );
      const moviesData = response.data;
      setFilteredMovies(moviesData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (query) => {
    const filtered = movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase()) &&
        (selectedGenres === "" ||
          movie.genre_ids.includes(parseInt(selectedGenres)))
    );
    setFilteredMovies(filtered);
  };

  /////////
  return (
    <>
      <div className="mt-14">
        <div className="flex flex-row justify-between p-4">
          <div>
            <select
              id="large"
              className="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={selectedGenres}
              onChange={(e) => setSelectedGenres(e.target.value)}
            >
              <option selected="">Choose Genres</option>
              <option value="">All Genres</option>
              <option value="28">Action</option>
              <option value="35">Comedy</option>
              <option value="18">Drama</option>
            </select>
          </div>
          <div>
            <form>
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative mx-20">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Mockups, Logos..."
                  required=""
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    handleSearch(e.target.value);
                  }}
                />
                <button
                  type="submit"
                  className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 p-10 min-h-screen">
          {filteredMovies.map((ele) => (
            <>
              <div key={ele.id} className="w-full">
                <a
                  href="#"
                  className="flex flex-col items-center h-full bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <img
                    className="object-cover w-full h-full rounded-t-lg md:w-64 md:rounded-none md:rounded-l-lg"
                    src={`https://image.tmdb.org/t/p/original/${ele.poster_path}`}
                    alt=""
                  />
                  <div className="flex flex-col justify-between p-4 leading-normal">
                    <div className="flex flex-row justify-between flex-wrap">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {ele.title}
                      </h5>
                      <div className="bg-yellow-400 font-bold rounded-xl p-2">
                        7.2
                      </div>
                    </div>

                    <div className="my-4">
                      <div>
                        <div className="text-sm text-gray-400">Series</div>
                        <div className="text-lg text-gray-800">
                          {ele.release_date}
                        </div>
                        <div className="text-sm text-gray-400 mt-20">
                          popularity
                        </div>
                        <div className="text-lg text-gray-800">
                          {ele.popularity}
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {ele.overview}
                    </p>
                  </div>
                </a>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default Fetch;
