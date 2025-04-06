import React from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { tokenAtom, moviesAtom } from "../../recoil/atom";
import { apiURl } from "../../configuration/apiconfig";
const MovieCard = ({ movie }) => {
  const [token, setToken] = useRecoilState(tokenAtom);
  const [movies, setMovies] = useRecoilState(moviesAtom);
  const isLiked = movie.likedBy.includes(token.email);

  const handleLike = async (movieId) => {
    if (token && token.email) {
      try {
        const likeResponse = await fetch(`${apiURl}/movies/${movieId}/like`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: token.email,
          }),
        });

        if (likeResponse.ok) {
          const response = await fetch(`${apiURl}/movies`);
          const moviesData = await response.json();
          setMovies(moviesData);
        } else {
          console.error("Failed to like the movie:", likeResponse.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("Please log in to like this movie.");
    }
  };

  const handleUnlike = async (movieId) => {
    if (token && token.email) {
      try {
        const likeResponse = await fetch(`${apiURl}/movies/${movieId}/unlike`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: token.email,
          }),
        });

        if (likeResponse.ok) {
          const response = await fetch(`${apiURl}/movies`);
          const moviesData = await response.json();
          setMovies(moviesData);
        } else {
          console.error("Failed to like the movie:", likeResponse.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("Please log in to unlike this movie.");
    }
  };

  return (
    <div className="flex justify-center items-center px-5 py-5">
      <div className="rounded-xl bg-white shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
        <Link to={`/movie/${movie._id}`}>
          <img
            className="w-full cursor-pointer rounded-t-xl"
            src={movie.image}
            alt=""
          />
          <div className="flex p-4 justify-between">
            <div className="flex h-[60px] items-start space-x-2">
              <h2 className="text-gray-800 font-bold cursor-pointer">
                {movie.name}
              </h2>
            </div>
          </div>
        </Link>

        <div className="flex items-center justify-between px-2 pb-3 text-gray-500">
          <div
            onClick={() =>
              isLiked ? handleUnlike(movie._id) : handleLike(movie._id)
            }
            className="flex items-center space-x-2 group"
          >
            <button className="flex justify-center items-center gap-2 px-2 group-hover:bg-gray-50 rounded-full p-1">
              <svg
                className={`w-5 h-5 fill-current ${
                  isLiked ? "fill-red-400" : "group-hover:fill-red-400"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C6.11 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-4.11 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>{movie.likes} Likes</span>
            </button>
          </div>
          <Link to={`/movie/${movie._id}`}>
            <button className="group flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
              <svg
                width="22px"
                height="22px"
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-current group-hover:fill-teal-500"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22ZM8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H13.5C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25H8ZM7.25 10.5C7.25 10.0858 7.58579 9.75 8 9.75H16C16.4142 9.75 16.75 10.0858 16.75 10.5C16.75 10.9142 16.4142 11.25 16 11.25H8C7.58579 11.25 7.25 10.9142 7.25 10.5Z"
                ></path>
              </svg>
              <span>Leave a comment</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
