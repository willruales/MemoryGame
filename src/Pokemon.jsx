import React, { useState, useEffect } from 'react';

function Pokemon({ setPokemons, setLoading, setError }) {
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
  }, [setPokemons, setLoading, setError]);

  return null;
}

export default Pokemon;
