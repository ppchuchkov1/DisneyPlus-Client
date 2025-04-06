import { atom } from "recoil";

export const moviesAtom = atom({
  key: "movies",
  default: [],
});

export const loadingMoviesAtom = atom({
  key: "loadingMovies",
  default: false,
});

export const singleMovieAtom = atom({
  key: "singleMovie",
  default: {},
});

export const tokenAtom = atom({
  key: "token",
  default: {},
});

export const commentsAtom = atom({
  key: "comments",
  default: [],
});

export const categoriessAtom = atom({
  key: "categories",
  default: [],
});
