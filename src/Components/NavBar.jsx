import React from "react";
import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/solid";
import { HomeIcon } from "@heroicons/react/24/outline";

/**
 * NavBar component that renders the top of the navigation bar of the app.
 * Includes a link to homepage, favorites page and a search bar.
 * Appearence changes for mobile and desktop views.
 * 
 * @param {string} searchQuery - Current value of the search input
 * @param {function} setSearchQuery - Function to update the search query state
 */
const NavBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <>
      <div className=" sticky top-0 z-10 p-2 bg-yellow-300 drop-shadow-sm">
        <nav className=" mx-1 sm:mx-2">
          <div className=" grid grid-cols-[0.8fr_2.4fr_0.8fr] items-center">
            {/* Left column - Home button */}
            <div className=" flex justify-start">
              <Link to="/" className=" flex items-center gap-1">
                <HomeIcon className=" h-8 w-8" />
              </Link>
            </div>

            {/* Center column - Search bar */}
            <div className=" flex justify-center">
              <input
                type="search"
                id="pokemonName"
                placeholder="Search for pokémon..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                className=" px-4 py-2 w-full max-w-sm bg-white border border-yellow-600 rounded-md shadow-sm"
              />
            </div>

            {/* Right column - Favorites button */}
            <div className=" flex justify-end">
              <Link to="/favorites" className=" flex items-center gap-1">
                <span className=" hidden sm:inline">Favorites</span>
                <HeartIcon className=" h-6 w-6 fill-red-600 stroke-black stroke-2" />
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
