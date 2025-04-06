import React from "react";
import MovieCard from "./MovieCard";
import { useRecoilState } from "recoil";
import { moviesAtom, loadingMoviesAtom } from "../../recoil/atom";
import Loader from "../Loader/Loader";
const MoviesSection = () => {
  const [movies, setMovies] = useRecoilState(moviesAtom);
  const [loadingMovies, setLoadingMovies] = useRecoilState(loadingMoviesAtom);

  return (
    <>
      <div className="min-h-screen">
        {loadingMovies ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-5">
            {movies.map((movie, index) => (
              <MovieCard movie={movie} key={index} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MoviesSection;
