import React from "react";
import './App.css';

import PlayerSearch from './components/PlayerSearch';
import BaselinePlayer from './components/BaselinePlayer';

function App() {
  return (
    <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <PlayerSearch></PlayerSearch>
      <BaselinePlayer></BaselinePlayer>
    </div>
  );
}

export default App;
