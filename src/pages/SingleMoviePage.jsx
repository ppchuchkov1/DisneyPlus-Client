import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { singleMovieAtom } from "../recoil/atom";
import { useParams } from "react-router-dom";
import MoviePlayer from "../components/SingleMovie/MoviePlayer";
import { apiURl } from "../configuration/apiconfig";

const SingleMoviePage = () => {
  const [singleMovie, setSingleMovie] = useRecoilState(singleMovieAtom);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiURl}/movies/${id}`);
        const data = await response.json();
        setSingleMovie(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <>
      <MoviePlayer />
    </>
  );
};

export default SingleMoviePage;
