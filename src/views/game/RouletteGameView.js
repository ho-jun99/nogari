import React, {useEffect, useState} from 'react';
import RottenPlatesGame from "../../components/RottenPlatesGame/RottenPlatesGame";
import {getGameRoomData} from "../../firebase/game-data";

export default function RouletteGameView({match}) {
    const [users, setUsers] = useState({});
    const [turn, setTurn] = useState([]);

    const changedgamedata = async (gamedata) => {
        setUsers(gamedata.players);
        setTurn(gamedata.turn);

    }

    useEffect(() => {
        getGameRoomData(match.params.roomId, changedgamedata);
    }, []);

  return (
    <>
      <div>
        <RottenPlatesGame turn={turn} users={users}/>
      </div>
    </>
  );
}