import React from "react";
import { useRecoilState } from "recoil";
import { singleMovieAtom } from "../../recoil/atom";
import MovieComments from "./MovieComments";

const MoviePlayer = () => {
  const [singleMovie] = useRecoilState(singleMovieAtom);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 z-0 py-5 px-5">
        <div className="flex flex-wrap max-w-6xl mx-auto">
          <div className="w-full md:flex-1">
            <video
              className="w-full rounded-lg"
              src={singleMovie.videoUrl}
              type="video/mp4"
              controls
              autoPlay
              muted
              loop
            ></video>
            <div className="flex flex-wrap items-end">
              <div className="pb-2">
                <h1 className="text-xl my-2">{singleMovie.name}</h1>
                <span className="text-base text-grey-darken">
                  {singleMovie.description}
                </span>
              </div>
            </div>
            <MovieComments />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MoviePlayer;
