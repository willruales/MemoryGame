import React, { useState, useEffect } from 'react';
import './PokemonGrid.css';

function PokemonGrid() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clickedPokemonIds, setClickedPokemonIds] = useState([]); // State to store clicked Pokémon IDs
  const [clickCount, setClickCount] = useState(0); // State to store the number of clicks

  useEffect(() => {
    const fetchRandomPokemon = async () => {
      try {
        setLoading(true);
        const pokemonPromises = [];
        for (let i = 0; i < 12; i++) {
          const randomId = Math.floor(Math.random() * 898) + 1;
          pokemonPromises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`).then(response => response.json()));
        }
        const pokemonData = await Promise.all(pokemonPromises);
        setPokemons(pokemonData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchRandomPokemon();
  }, []);

  const handleShuffle = () => {
    setPokemons(prevPokemons => [...prevPokemons].sort(() => Math.random() - 0.5));
  };

  // Function to handle when a Pokémon card is clicked
  const handlePokemonClick = (id) => {
    if (clickedPokemonIds.includes(id)) {
      // If the same Pokémon card is clicked twice, reset the counter and clicked IDs array
      setClickedPokemonIds([]); // Reset the clicked IDs array
      setClickCount(0); // Reset the click count
    } else {
      // Otherwise, add the ID to the array and increment the click count
      setClickedPokemonIds((prevIds) => [...prevIds, id]);
      setClickCount((prevCount) => prevCount + 1); // Increment the click count
    }
    handleShuffle(); // Shuffle the grid after each click
  };

  return (
    <div>
      <button onClick={handleShuffle}>Shuffle</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div className="pokemon-grid">
        {!loading && !error && pokemons.map(pokemon => (
          <div
            key={pokemon.id}
            className="pokemon-card"
            onClick={() => handlePokemonClick(pokemon.id)} // Add onClick handler to store key in array
          >
            <h2>{pokemon.name}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          </div>
        ))}
      </div>
      <div className="clicked-keys">
        <h3>Clicked Pokémon IDs:</h3>
        <ul>
          {clickedPokemonIds.map(id => (
            <li key={id}>{id}</li>
          ))}
        </ul>
        <h3>Total Clicks: {clickCount}</h3> {/* Display the total number of clicks */}
      </div>
    </div>
  );
}

export default PokemonGrid;
