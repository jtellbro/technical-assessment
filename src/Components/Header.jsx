import React from "react";
/**
 * Header component that displays a dynamic bakcground with floating pokéballs and
 * glitter effect. Randomly generated positions for pokéballs and "glitter", checks position to
 * avoid clustering of pokéballs.
 * Includes image of pokemons and a title text.
 */
const Header = () => {
  /**
   * Generate random positions for pokeballs, check distance to avoid clustering.
   * Tries
   *
   * @param {number} count - Number of positions to generate
   * @param {number} minDistancePrecent - Minimum distance between positions in percent
   * @returns {Array} - Array of objects with top, left, size and animationDelay properties
   *  */
  const generateSpreadOutPositions = (count, minDistancePrecent = 10) => {
    const positions = [];
    const maxTries = 100;
    let tries = 0;

    // Calculates positions for pokeballs, until positions are filled or maxTries is reached
    while (positions.length < count && tries < maxTries) {
      const top = Math.random() * 100;
      const left = Math.random() * 100;

      //Check if the new position is too close to existing positions
      const tooClose = positions.some((pos) => {
        const dx = pos.left - left;
        const dy = pos.top - top;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < minDistancePrecent;
      });

      // Add position to array if not too close to existing positions
      if (!tooClose) {
        positions.push({ top, left });
      }
      tries++;
    }

    return positions.map((pos, i) => ({
      id: i,
      top: `${pos.top}%`,
      left: `${pos.left}%`,
      size: 1 + Math.random() * 1.5,
      animationDelay: `${Math.random() * 5}s`,
    }));
  };

  // Generates glitter effect with random positioned dots and animation delay
  const generateGlitter = (count = 20) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: 1 + Math.random() * 1.5,
      animationDelay: `${Math.random() * 3}s`,
    }));
  };

  const numOfBalls = 25;
  const smallImages = generateSpreadOutPositions(numOfBalls, 10);
  const glitter = generateGlitter(30);

  return (
    <>
      <div className=" relative w-screen h-106 bg-gradient-to-b from-darkblue to-brightblue">
        {/* Glitter effect */}
        <div>
          {glitter.map((dot) => (
            <div
              key={dot.id}
              className="absolute glitter-dot"
              style={{
                top: dot.top,
                left: dot.left,
                width: `${dot.size}px`,
                height: `${dot.size}px`,
                animationDelay: dot.animationDelay,
              }}
            />
          ))}
        </div>
        {/* Small images in background */}
        <div className=" absolute inset-0 z-0 overflow-hidden">
          {smallImages.map((img) => (
            <img
              key={img.id}
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
              alt="pokeballs"
              className="absolute opacity-90 animate-float drop-shadow-sm"
              style={{
                top: img.top,
                left: img.left,
                width: `${img.size}rem`,
                height: `${img.size}rem`,
                animationDelay: img.animationDelay,
              }}
            />
          ))}
        </div>
        {/* Main header image and text */}
        <img
          src="./images/pokemon-2.png"
          alt="pokemons"
          className="absolute w-full h-96 object-contain z-2 drop-shadow-lg pb-4"
        />
        <div className=" flex flex-col justify-end items-center absolute inset-0 z-2 pb-2 sm:pb-4 shadow-lg">
          <h1 className=" font-presstart text-md sm:text-xl text-stroke-shadow">
            Find your favorite pokémons!
          </h1>
        </div>
      </div>
    </>
  );
};

export default Header;
