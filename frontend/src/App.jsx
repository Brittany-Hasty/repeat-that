import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Game from './components/game/game_container';
import Leaderboard from './components/leaderboard/leaderboard_container';

function App() {
  return (
    <div className="App">
      <header>
        <Route path="/" component={Navbar} />
      </header>
      <Switch>
        <Route path="/leaderboard" component={Leaderboard} />
        <Route exact path="/" component={Game} />
      </Switch>
    </div>
  );
}

export default App;
