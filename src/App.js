import React from 'react';
import { Route } from 'react-router-dom';
// import { LiarGameView, MainView, RouletteGameView, WordGameView, } from './views';
import MainNavigator from "./components/common/MainNavigator";
import Choose_Char from "./views/Choose_Char";
import find from "./views/find";
import { LiarGameView, WaitingRoomView, RouletteGameView, WordGameView, MainView, CreateUserView } from './views';
import AlcoholMarbleView from "./views/AlcoholMarbleView";
import CreateRoomView from "./views/CreateRoomView"
import ChangeCharacterView from "./views/ChangeCharacterView";

function App() {
  return (
  <div>
    <div>
        <Route exact path="/" component={MainView}/>
        <Route path="/liar" component={LiarGameView}/>
        <Route path="/roulette" component={RouletteGameView}/>
        <Route path="/word" component={WordGameView}/>
        <Route path="/find" component={find}/>
        <Route path="/Choose_Char" component={Choose_Char}/>
        {/*<Route path="/" component={MainView} />*/}
        <Route exact path="/rooms/:roomId" component={WaitingRoomView}/>
        <Route path="/marble" component={AlcoholMarbleView}/>
        <Route path="/createUser" component={CreateUserView}/>
        <Route path="/createRoom" component={CreateRoomView}/>
        <Route path="/changeCharacter" component={ChangeCharacterView}/>
      </div>
    </div>
  );
}

export default App;
