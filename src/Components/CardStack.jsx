import React, { useState, useEffect, useMemo } from "react";
import PokemonCard from "./PokemonCard";
import Pagination from "./Pagination";

/**
 * CardStack component that displays a grid of PokemonCard-components
 * Filters pokemons based on favorites and searchQuery, uses pagination to 
 * show only a limited number of pokemons at a time. Grid layout responsive 
 * to adapt number of columns based on screen size.
 * Fetches detailed info for current pokemons from the pokéAPI.
 * 
 * @param {Array} pokemons - Array of all pokemons from the API (name + URLs)
 * @param {string} searchQuery - Search query to filter pokemons by name
 * @param {number} currentPage - Current page number for pagination
 * @param {function} setCurrentPage - Function to set the current page number
 * @param {number} limit - Number of pokemons to show per page
 * 
 * @returns A grid of PokemonCard-components and a Pagination component. If no pokemons are found,
 * a message is displayed instead.
 */
const CardStack = ({
  pokemons,
  searchQuery = "",
  currentPage,
  setCurrentPage,
  limit,
}) => {
  const [pagePokemons, setPagePokemons] = useState([]);

  // Memorize filteredPokemons to avoid unnecessary re-renders
  const filteredPokemons = useMemo(() => {
    if (!pokemons || pokemons.length === 0) {
      return [];
    }

    let pokemonsToShow = pokemons;

    // If searchQuery is not empty, filter pokemons to show only those that match the query
    if (searchQuery) {
      pokemonsToShow = pokemonsToShow.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return pokemonsToShow;
  }, [pokemons, searchQuery]);

  // Fetch detailed info from PokéAPI for current page of pokemons every time filteredPokemons,
  // currentPage, or limit changes
  useEffect(() => {
    const fetchPageDetails = async () => {
      const start = currentPage * limit;
      const currentSlice = filteredPokemons.slice(start, start + limit);

      const detailedData = await Promise.all(
        currentSlice.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return await res.json();
        })
      );
      setPagePokemons(detailedData);
    };

    // If there are filtered pokemons, fetch their details
    if (filteredPokemons.length > 0) {
      fetchPageDetails();
    } else {
      setPagePokemons([]);
    }
  }, [filteredPokemons, currentPage, limit]);

  const totalPages = Math.ceil(filteredPokemons.length / limit);

  // If there are no pokemons to show, display message instead of cards
  if (!pokemons || pokemons.length === 0) {
    return <p className=" flex justify-center p-4">No pokémons to show</p>;
  }

  return (
    <>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 sm:p-10 sm:pb-2 bg-white">
        {pagePokemons?.map((pokemon, index) => (
          <PokemonCard
            key={pokemon.id || index}
            name={pokemon.name}
            base_stats={pokemon.stats[0].base_stat}
            sprites={pokemon.sprites.front_default}
            types={pokemon.types}
            abilities={pokemon.abilities}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default CardStack;