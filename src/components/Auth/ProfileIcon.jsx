import React from "react";
import { useRecoilState } from "recoil";
import { tokenAtom } from "../../recoil/atom";
import { Link } from "react-router-dom";

const ProfileIcon = () => {
  const [token, setToken] = useRecoilState(tokenAtom);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative inline-block text-left dropdown">
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <button
            className="transition duration-150 ease-in-out cursor-pointer"
            type="button"
            aria-haspopup="true"
            aria-expanded="true"
            aria-controls="headlessui-menu-items-117"
          >
            <span className="font-medium text-gray-600 dark:text-gray-300">
              {token?.email?.substring(0, 2)?.toUpperCase()}
            </span>
          </button>
        </div>
        <div className="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
          <div
            className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
            aria-labelledby="headlessui-menu-button-1"
            id="headlessui-menu-items-117"
            role="menu"
          >
            <div className="px-4 py-3">
              <p className="text-sm leading-5">Signed in as</p>
              <p className="text-sm font-medium leading-5 text-gray-900 truncate">
                {token.email}
              </p>
            </div>
            <Link to="https://github.com/ppchuchkov1" target="_blank">
              <div className="py-1 cursor-pointer">
                <div className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left">
                  Github Profile
                </div>
              </div>
            </Link>
            <div onClick={logout} className="py-1 cursor-pointer">
              <div className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left">
                Logout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileIcon;
