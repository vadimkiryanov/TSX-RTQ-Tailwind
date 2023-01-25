import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="flex h-20 items-center justify-between bg-gray-500 px-5 text-white shadow-md">
      <h3 className="font-bold">Github Search</h3>

      <span>
        <Link className="mr-2 hover:text-blue-400 transition-colors" to="/">
          Home
        </Link>
        <Link className="hover:text-blue-400 transition-colors" to="/favourites">
          Favourites
        </Link>
      </span>
    </nav>
  );
};

export default Navigation;