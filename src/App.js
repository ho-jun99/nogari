import React from 'react';
import { Route } from 'react-router-dom';
import { LiarGameView, MainView, RouletteGameView, WordGameView, } from './views';
import MainNavigator from "./components/common/MainNavigator";
import Choose_Char from "./views/Choose_Char";
import find from "./views/find";

function App() {
  return (
    <div>
      <div>
        <MainNavigator />
      </div>
      <div>
        <Route exact path="/" component={MainView}/>
        <Route path="/liar" component={LiarGameView}/>
        <Route path="/roulette" component={RouletteGameView}/>
        <Route path="/word" component={WordGameView}/>
        <Route path="/find" component={find}/>
        <Route path="/Choose_Char" component={Choose_Char}/>
      </div>
    </div>
  );
}

export default App;
