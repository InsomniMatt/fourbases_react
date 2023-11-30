import React from "react";
import './App.css';

import PlayerSearch from './components/PlayerSearch';
import BaselinePlayer from './components/BaselinePlayer';

function App() {
  return (
    <div className="App">
      <PlayerSearch></PlayerSearch>
      <BaselinePlayer></BaselinePlayer>
    </div>
  );
}

export default App;
