import React, { useState } from 'react';
import PokemonGrid from './PokemonGrid';
import './App.css';
import NumberSetter from './Counter';

function App() {
  const [showGrid, setShowGrid] = useState(false);

  const handleStart = () => {
    setShowGrid(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pokémon Image Fetcher</h1>
        <button onClick={handleStart}>Start</button>
        {showGrid && <PokemonGrid />}
      </header>
    </div>
  );
}

export default App;
