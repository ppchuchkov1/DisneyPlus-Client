import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRecoilState } from "recoil";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import {
  categoriessAtom,
  moviesAtom,
  loadingMoviesAtom,
  tokenAtom,
} from "../../recoil/atom";
import disneyLogoCastle from "../../assets/disney-logo-castle.jpg";
import disneyLogoHeart from "../../assets/disney-logo-heart.jpg";
import { apiURl } from "../../configuration/apiconfig";

const CategorySlider = () => {
  const [categories, setCategories] = useRecoilState(categoriessAtom);
  const [movies, setMovies] = useRecoilState(moviesAtom);
  const [loadingMovies, setLoadingMovies] = useRecoilState(loadingMoviesAtom);
  const [token, setToken] = useRecoilState(tokenAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiURl}/categories`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getMoviesByCategoryId = async (categoryId) => {
    setLoadingMovies(true);
    try {
      const response = await fetch(`${apiURl}/categories/${categoryId}/movies`);
      const data = await response.json();
      setMovies(data);
      setLoadingMovies(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAllMovies = async () => {
    try {
      setLoadingMovies(true);
      const response = await fetch(`${apiURl}/movies/`);
      const data = await response.json();
      setMovies(data);
      setLoadingMovies(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getLikedMovies = async (userEmail) => {
    try {
      setLoadingMovies(true);
      const response = await fetch(`${apiURl}/categories/liked/${userEmail}`);
      const data = await response.json();
      setMovies(data);
      setLoadingMovies(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 pb-5">
      <Swiper
        slidesPerView={2.5}
        spaceBetween={10}
        freeMode={true}
        modules={[FreeMode]}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
        className="w-full"
      >
        <SwiperSlide>
          <div
            onClick={getAllMovies}
            className="bg-white rounded-xl overflow-hidden cursor-pointer"
          >
            <img src={disneyLogoCastle} className="w-full h-32 object-cover" />

            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">All Movies</h3>
            </div>
          </div>
        </SwiperSlide>
        {Object.keys(token).length > 0 && (
          <SwiperSlide>
            <div
              onClick={() => getLikedMovies(token.email)}
              className="bg-white rounded-xl overflow-hidden cursor-pointer"
            >
              <img src={disneyLogoHeart} className="w-full h-32 object-cover" />

              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">Liked Movies</h3>
              </div>
            </div>
          </SwiperSlide>
        )}
        {categories.map((category) => (
          <SwiperSlide key={category._id}>
            <div
              onClick={() => getMoviesByCategoryId(category._id)}
              className="bg-white rounded-xl overflow-hidden cursor-pointer"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">{category.name}</h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategorySlider;
