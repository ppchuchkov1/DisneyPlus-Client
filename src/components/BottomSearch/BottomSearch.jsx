import React from "react";
import { useRecoilState } from "recoil";
import { moviesAtom } from "../../recoil/atom";

const BottomSearch = () => {
  const [movies, setMovies] = useRecoilState(moviesAtom);

  const scrollToMovies = () => {
    document.getElementById("movies")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    const originalMoviesJSON = localStorage.getItem("originalMovies");

    if (!originalMoviesJSON && searchTerm && movies.length > 0) {
      localStorage.setItem("originalMovies", JSON.stringify(movies));
    }

    const originalMovies = originalMoviesJSON
      ? JSON.parse(originalMoviesJSON)
      : movies;

    if (!searchTerm) {
      setMovies(originalMovies);
      return;
    }

    const filteredMovies = originalMovies.filter((movie) => {
      return (
        movie &&
        (movie.name?.toLowerCase().includes(searchTerm) ||
          movie.title?.toLowerCase().includes(searchTerm))
      );
    });

    setMovies(filteredMovies);
  };

  return (
    <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-none sm:rounded-lg left-1/2 bottom-0 sm:bottom-4">
      <div className="relative flex flex-col gap-4 justify-center items-center w-full h-full px-3 md:px-0">
        <div className="relative p-3 rounded-lg w-full max-w-lg">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 rounded-lg"
                placeholder="Search movie by name"
                onChange={handleSearch}
                onClick={scrollToMovies}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomSearch;
