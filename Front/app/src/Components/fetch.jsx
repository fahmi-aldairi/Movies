import { useEffect, useState } from "react";

function Fetch() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    // Fetch the list of movies from the Express API endpoint
    fetch("http://localhost:4009/movies")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredData = data.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || movie.genre.includes(selectedCategory))
  );

  const categories = [...new Set(data.map((movie) => movie.genre).flat())];

  return (
    <>
      <div className="" style={{ marginTop: "3rem" }}>
        <div className="flex justify-center p-4">
          <input
            type="text"
            placeholder="Search movies..."
            className="p-2 border border-gray-300 rounded-lg"
            value={searchTerm}
            onChange={handleSearch}
          />
          <select
            className="ml-4 p-2 border border-gray-300 rounded-lg"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        {filteredData.map((ele) => (
          <>
            {/* component */}
            <div
              className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12"
              key={ele.id}
            >
              <div className="py-3 sm:max-w-xl sm:mx-auto">
                <div className="bg-white shadow-lg border-gray-100 max-h-96	 border sm:rounded-3xl p-8 flex space-x-8">
                  <div className="h-48 overflow-visible w-1/3">
                    <img
                      className="ImageCard rounded-3xl shadow-lg"
                      src={`https://image.tmdb.org/t/p/original/${ele.poster_path}`}
                      alt=""
                      style={{ width: "25rem", height: "30rem" }}
                    />
                  </div>
                  <div className="flex flex-col w-1/2 space-y-4">
                    <div className="flex justify-between items-start flex-wrap">
                      <h2 className="text-2xl font-bold">{ele.title}</h2>
                      <div className="bg-yellow-400 font-bold rounded-xl p-2">
                        {ele.vote_average}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Series</div>
                      <div className="text-lg text-gray-800">
                        {ele.release_date}
                      </div>
                      <div className="text-lg text-gray-800">
                        {ele.popularity}
                      </div>
                    </div>
                    <p className=" text-gray-400 max-h-40 overflow-y-hidden">
                      {ele.overview}
                    </p>
                    <div className="flex text-2xl font-bold text-a">$83.90</div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="flex flex-col  rounded-lg bg-gray-400 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-xl md:flex-row">
              <img
                className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                src={`https://image.tmdb.org/t/p/original/${ele.poster_path}`}
                alt=""
              />
              <div className="flex flex-col justify-start p-6">
                <h5 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
                  Card title
                </h5>
                <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-300">
                  Last updated 3 mins ago
                </p>
              </div>
            </div> */}
          </>
        ))}
      </div>
    </>
  );
}

export default Fetch;
