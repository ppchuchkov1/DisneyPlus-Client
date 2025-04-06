import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import logo from "../../assets/logo.png";
import { tokenAtom } from "../../recoil/atom";
import ProfileIcon from "../Auth/ProfileIcon";
import searchIocn from "../../assets/search.png";

const Header = () => {
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(tokenAtom);

  const scrollToMovies = () => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("movies")?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };

  return (
    <header className="sticky top-0 z-50">
      <nav className="backdrop-blur-md bg-white/20 px-4 lg:px-6 py-3">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img src={logo} className="mr-3 h-9" alt="Disney Logo" />
          </Link>
          <div className="flex items-center">
            <div className="cursor-pointer mr-5" onClick={scrollToMovies}>
              <img src={searchIocn} width="20px" alt="search" />
            </div>
            {Object.keys(token).length === 0 ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-800 font-medium rounded-lg text-sm pr-4 lg:pr-5 py-2 lg:py-2.5"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-white bg-teal-500 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                >
                  Register
                </Link>
              </>
            ) : (
              <ProfileIcon />
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
