import React from 'react';
import { Route } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Game from './components/game/game';

function App() {
  return (
    <div className="App">
      <Route path="/" component={Navbar} />
      <Route exact path="/" component={Game} />
    </div>
  );
}

export default App;
