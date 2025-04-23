import React from "react";

/**
 * Component to list abilities and types of a pokémon. Uses specific background colors for
 * different types, abilities uses the same background color. Text is formatted to replace
 * hyphens with spaces and capitalize the list items.
 * @param {Object[]} items - List of abilities or types to display
 */
const List = ({ items }) => {
  // Define background colors for each type
  const typeColors = {
    normal: "bg-zinc-700/30",
    fighting: "bg-amber-700",
    flying: "bg-blue-400",
    poison: "bg-indigo-700/90",
    ground: "bg-yellow-950",
    rock: "bg-stone-700",
    bug: "bg-lime-600",
    ghost: "bg-indigo-950",
    steel: "bg-slate-700",
    fire: "bg-red-400",
    water: "bg-sky-500",
    grass: "bg-lime-900/90",
    electric: "bg-yellow-500",
    psychic: "bg-rose-400",
    ice: "bg-teal-300",
    dragon: "bg-indigo-400",
    dark: "bg-stone-800",
    fairy: "bg-fuchsia-300",
    unknown: "bg-stone-950",
  };

  return (
    <div className=" flex flex-wrap gap-2 p-2">
      {items?.map((a, index) => {
        // If items have a.type-property, get type, else get ability
        const isType = !!a.type;
        let name = isType ? a.type.name : a.ability.name;
        name = name.replaceAll("-", " ");
        // Get the background and text color based on type or ability
        const bgColor = isType
          ? typeColors[name] || "bg-gray-300"
          : "bg-gray-200";
        const textColor = isType ? "text-white" : "text-gray-700";

        return (
          <p
            key={index}
            className={` p-1 rounded text-xs font-bold ${textColor} ${bgColor}`}
          >
            {name.toUpperCase()}
          </p>
        );
      })}
    </div>
  );
};

export default List;
