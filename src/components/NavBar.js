import React from "react";
import logo from "../logo.png";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <div className="flex items-center border p-2">
        <img className="ml-4 w-15 h-12 " src={logo} alt="logo-NavBar" />
        <Link
          to="/"
          className="ml-9 font-mono text-blue-500 font-bold text-xl md:text-3xl"
        >
          Movies
        </Link>
        <Link
          to="/favourites"
          className="ml-9 font-mono text-blue-500 text-xl font-bold md:text-3xl"
        >
          Favourites
        </Link>
      </div>
    </>
  );
}

export default NavBar;
