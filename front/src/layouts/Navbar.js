import React, { useState } from "react";
import firebase from "firebase";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpne] = useState(false);
  const toggle = () => {
    setOpne(!open);
  };
  return (
    <div className="fixed absolute w-full relative">
      <header className="sm:items-center bg-gray-900 sm:flex sm:items-center sm:justify-between">
        <div className="flex justify-between bg-gray-900 px-4 py-3">
          <div>
            <Link to="/profile">
              <img
                className="h-8 w-auto"
                src="/img/Koompi-White.png"
                alt="logo"
              />
            </Link>
          </div>
          <div className="flex">
            <button
              onClick={toggle}
              className="px-2 focus:outline-none hover:text-white focus:text-white sm:hidden "
            >
              <svg
                className="h-6 w-6 fill-current text-gray-500 "
                viewBox="0 0 24 24"
              >
                {open ? (
                  <path d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                ) : (
                  <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                )}
              </svg>
            </button>
          </div>
        </div>
        <div className={open ? "block sm:hidden" : "hidden sm:block"}>
          <nav className="sm:flex sm:items-center sm:px-4 ">
            <div className="px-2 pt-2 pb-5 border-b border-gray-800 sm:flex sm:border-b-0 sm:py-0">
              {/* <Link
                to="/profile"
                className="sm:px-2 sm:text-sm  block px-3 py-1 rounded font-semibold text-white hover:bg-gray-800"
                href="#"
              >
                Profile
              </Link> */}
              <Link
                to="/"
                className="sm:px-2 sm:text-sm  block px-3 py-1 rounded font-semibold text-white hover:bg-gray-800"
                href="#"
              >
                Play
              </Link>
              <Link
                to="/profile"
                className="sm:px-2 mt-3 sm:text-sm sm:mt-0 block px-3 py-1 rounded font-semibold text-white hover:bg-gray-800"
                href="#"
              >
                Profile
              </Link>
              <Link
                onClick={() => firebase.auth().signOut()}
                to="/logout"
                className="sm:px-2 mt-3 sm:text-sm sm:mt-0 block px-3 py-1 rounded font-semibold text-white hover:bg-gray-800"
                href="#"
              >
                Logout
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
