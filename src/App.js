import React from 'react';
import { Route } from 'react-router-dom';
import { LiarGameView, WaitingRoomView, RouletteGameView, WordGameView, MainView, CreateUserView } from './views';
import MainNavigator from "./components/common/MainNavigator";
import AlcoholMarbleView from "./views/AlcoholMarbleView";
import CreateRoomView from "./views/CreateRoomView"
import ChangeCharacterView from "./views/ChangeCharacterView";

function App() {
  return (
    <div>
      <div>
        <Route path="/" component={MainView} />
        <Route exact path="/rooms/:roomId" component={WaitingRoomView}/>
        <Route path="/liar" component={LiarGameView}/>
        <Route path="/roulette" component={RouletteGameView}/>
        <Route path="/word" component={WordGameView}/>
        <Route path="/marble" component={AlcoholMarbleView}/>
        <Route path="/createUser" component={CreateUserView}/>
        <Route path="/createRoom" component={CreateRoomView}/>
        <Route path="/changeCharacter" component={ChangeCharacterView}/>
      </div>
    </div>
  );
}

export default App;
