import { HeartIcon as FilledHeart } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import React from "react";
import { useState, useEffect } from "react";
import List from "./List";

/**
 * PokemonCard component displays information about a pokémon.
 * Each card includes name, base stats, sprite, types, abilities and a favorite button.
 * The status of favorites is stored using localStorage.
 *
 * @param {string} name - Name of pokémon
 * @param {string} base_stats - Base stats of pokémon (HP)
 * @param {string} sprites - URL of the pokémon sprite front default image
 * @param {Array} types - Array of types of the pokémon
 * @param {Array} abilities - Array of abilities of the pokémon
 */
const PokemonCard = ({ name, base_stats, sprites, types, abilities }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if the current pokemon is a favorite when the component mounts or when the name changes
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.includes(name));
  }, [name]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let updatedFavorites;

    // If pokémon is already a favorite, remove from list, else add to list
    if (favorites.includes(name)) {
      updatedFavorites = favorites.filter((n) => n !== name);
    } else {
      updatedFavorites = [...favorites, name];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(updatedFavorites.includes(name));
  };

  // Format name by removing hyphens and capitalizing the first letter
  name = name.replaceAll("-", " ");
  const pokemonName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <>
      <div className=" flex flex-col min-w-[150px] h-full bg-white rounded-lg shadow-lg transition duration-300 ease-in-out hover:scale-105">
        <div className=" flex justify-between p-4 bg-slate-200 rounded-t-lg">
          <p className=" font-semibold text-lg">{pokemonName}</p>
          <div>
            <p className=" font-bold text-xl">{base_stats}</p>
          </div>
        </div>
        <img
          src={sprites}
          alt={pokemonName}
          id="sprite"
          className=" mx-auto h-24 transition duration-300 ease-in-out hover:scale-110"
        />
        <div>
          <p className=" ml-2 text-gray-500 text-left text-xs font-light">
            ABILITIES
          </p>
          <List items={abilities} />
        </div>
        <div>
          <p className=" ml-2 text-gray-500 text-left text-xs font-light">
            TYPES
          </p>
          <List items={types} />
        </div>
        <div className=" flex justify-end p-2 mt-auto">
          <button
            onClick={toggleFavorite}
            className=" transition ease-in-out duration-300 hover:scale-110"
          >
            {isFavorite ? (
              <FilledHeart className=" h-6 w-6 fill-red-600 stroke-black" />
            ) : (
              <OutlineHeart className=" h-6 w-6" />
            )}{" "}
          </button>
        </div>
      </div>
    </>
  );
};

export default PokemonCard;
