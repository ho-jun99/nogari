import React from 'react';
import { Route } from 'react-router-dom';
import {
  LiarGameView,
  RouletteGameView,
  WordGameView,
  MainView,
  CreateUserView,
  AlcoholMarbleView,
  CreateRoomView,
  ChangeCharacterView,
  Choose_Char,
  FindView,
  NewWaitingRoom,
} from './views';

function App() {
  return (
  <div>
    <div>
        <Route exact path="/" component={MainView}/>
        <Route path="/rooms/:roomId/liar" component={LiarGameView}/>
        <Route path="/roulette" component={RouletteGameView}/>
        <Route path="/word" component={WordGameView}/>
        <Route path="/find" component={FindView}/>
        <Route path="/Choose_Char" component={Choose_Char}/>
        <Route exact path="/rooms/:roomId" component={NewWaitingRoom}/>
        <Route path="/rooms/:roomId/marble" component={AlcoholMarbleView}/>
        <Route path="/createUser" component={CreateUserView}/>
        <Route path="/createRoom" component={CreateRoomView}/>
        <Route path="/changeCharacter" component={ChangeCharacterView}/>
      </div>
    </div>
  );
}

export default App;
