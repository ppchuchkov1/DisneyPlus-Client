import React, { useEffect } from "react";
import Hero from "../components/Hero/Hero";
import MoviesSection from "../components/Movies/MoviesSection";
import CategorySlider from "../components/Categories/CategoriesSlider";
const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Hero />
      <CategorySlider />
      <div id="movies" className="h-[30px]"></div>
      <MoviesSection />
    </>
  );
};

export default Home;
