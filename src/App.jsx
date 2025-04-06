import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { tokenAtom, moviesAtom, loadingMoviesAtom } from "./recoil/atom";
import HomePage from "./pages/HomePage";
import BottomSearch from "./components/BottomSearch/BottomSearch";
import Header from "./components/Header/Header";
import SingleMoviePage from "./pages/SingleMoviePage";
import LoginPage from "./pages/LoginPage";
import Footer from "./components/Footer/Footer";
import RegisterPage from "./pages/RegisterPage";
import { apiURl } from "./configuration/apiconfig";

const App = () => {
  const [token, setToken] = useRecoilState(tokenAtom);
  const [movies, setMovies] = useRecoilState(moviesAtom);
  const [loadingMovies, setLoadingMovies] = useRecoilState(loadingMoviesAtom);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingMovies(true);
      try {
        const response = await fetch(`${apiURl}/movies/`);
        const data = await response.json();
        setMovies(data);
        setLoadingMovies(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
  }, []);

  const ProtectivePage = (children) => {
    return Object.keys(token).length === 0 ? (
      <>{children}</>
    ) : (
      <Navigate to="/" />
    );
  };

  return (
    <Routes>
      <Route
        index
        element={
          <>
            <Header />
            <HomePage />
            <BottomSearch />
            <Footer />
          </>
        }
      />
      <Route
        path="/movie/:id"
        element={
          <>
            <Header />
            <SingleMoviePage />
            <Footer />
          </>
        }
      />
      <Route
        path="/login"
        element={
          <>
            <Header />
            {ProtectivePage(<LoginPage />)}
          </>
        }
      />
      <Route
        path="/register"
        element={
          <>
            <Header />
            {ProtectivePage(<RegisterPage />)}
          </>
        }
      />
    </Routes>
  );
};

export default App;
