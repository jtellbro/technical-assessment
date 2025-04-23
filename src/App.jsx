import { useState, useEffect, useMemo } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Header from "./Components/Header";
import CardStack from "./Components/CardStack";

/**
 * Components gets all pokémons from pokéAPI and stores name and url in a list.
 * Includes logic for searching for pokémons, and handling current pages.
 *
 */
function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 20;
  const location = useLocation();

  //Fetch pokémon data from PokéAPI
  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0"
        );
        const data = await response.json();
        setPokemonList(data.results);
      } catch (error) {
        console.error("Error when fetching pokémons:", error);
      }
    };
    fetchAllPokemon();
  }, []);

  // Reset search query and page number on location change
  useEffect(() => {
    setCurrentPage(0);
    if (location.pathname === "/" || location.pagename === "/favorites") {
      setSearchQuery("");
    }
  }, [location.pathname]);

  // Get favorite pokémons from localStorage only when user is on favorites page
  const favoriteList = useMemo(() => {
    if (location.pathname === "/favorites") {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      return pokemonList.filter((p) => favorites.includes(p.name));
    }
    return [];
  }, [location.pathname, pokemonList]);

  // Memoize header to avoid re-rendering of animation/generated content
  const memoHeader = useMemo(() => <Header />, []);

  return (
    <>
      <NavBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {memoHeader}
      <Routes>
        <Route
          path="/"
          element={
            <CardStack
              pokemons={pokemonList}
              searchQuery={searchQuery}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              limit={limit}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <CardStack
              pokemons={favoriteList}
              searchQuery={searchQuery}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              limit={limit}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
