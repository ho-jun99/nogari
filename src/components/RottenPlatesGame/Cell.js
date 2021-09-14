import react, {useContext, memo, useState, useEffect} from 'react';
import {TableContext,CODE, OTHER_TURN, PASS, UNPASS} from './RottenPlatesGame';
import no from './PlatesGameImage/no.png';
import pass from './PlatesGameImage/pass.png';
import {setLiarPlayerData, setRoulettePlayerData, updateRouletteTurn} from "../../firebase/game-data";
import {getUserTurn} from "../../firebase/get-turn";
import {getRoomInfo} from "../../firebase/waiting-room";
import {getUserInfo} from "../../firebase/users";


const getCellStyle = (code) => {
  if (code === CODE.NORMAL) {
    return {
    }
  } else if (code === CODE.CLICKED) {
    return {
      pointerEvents : 'none',
      opacity : '0.5',
    }
  }
}

const getCellItemStyle = (status, penalty) => {
  if (  status === CODE.CLICKED && penalty === "pass") {
    return {
      backgroundImage: `url(${pass})`,
    }
  } else if (status === CODE.CLICKED && penalty !== "pass") {
    return {
      backgroundImage: `url(${no})`,
    }
  }
}

const Cell = memo((props, { cellId, cellIndex, cellPenalty, cellStatus} ) => {
  const {table,setTable,halted,setHalted,gameStatus,setGameStatus,curUser,setCurUser,selectPlate,setSelectPlate, turn, setTurn, SeverPenaltyList} = useContext(TableContext);
  const onClickCell = async (e) => {
    if (halted) {
      return;
    }
    alert(`Result :  ${cellId} / ${cellPenalty}`);
    if(table[cellIndex].status === CODE.NORMAL) {
      if (table[cellIndex].penalty === "pass") {
        const temp = [...table];
        temp[cellIndex].status = CODE.CLICKED;
        setTable(temp);
        setGameStatus(OTHER_TURN);
        setCurUser((prev) => prev + 1);
        setSelectPlate({ispass: true, cellId : cellId, cellPenalty : cellPenalty});
        setHalted(true);
        setGameStatus(OTHER_TURN);

        // await setRoulettePlayerData(roomNumber, props.turn[point], 'order', false);
        // setPoint(point++);
        // if(ServerUsers.length > point) {
        //   await setRoulettePlayerData(roomNumber, props.turn[point], 'order', true);
        // } else {
        //   setPoint(0)
        // }

      } else {
        const temp = [...table];
        temp[cellIndex].status = CODE.CLICKED;
        setTable(temp);
        setGameStatus(OTHER_TURN);
        setCurUser((prev) => prev + 1);
        setSelectPlate({ispass: false, cellId : cellId, cellPenalty : cellPenalty});
        setHalted(true);
        setGameStatus(UNPASS);

        // await setRoulettePlayerData(roomNumber, props.turn[point], 'order', false);
        // setPoint(point++);
        // if(ServerUsers.length > point) {
        //   await setRoulettePlayerData(roomNumber, props.turn[point], 'order', true);
        // } else {
        //   setPoint(0)
        // }
      }
    }
    console.log("cellID : ", cellId, "cellIndex : ", cellIndex, "status : ", table[cellIndex].status, "cellPenalty : ", cellPenalty);
  }

  let [point, setPoint] = useState(0)
  const roomNumber = localStorage.getItem('roomNumber')
  const ServerUsers = Object.entries(turn);
  const firstPlayer = turn[0]
  //console.log(firstPlayer)
  const [userProfile, setUserProfile] = useState([]);
  const setUserInfo = async (roomInfo) => {
    // await console.log(roomInfo);
    let members = [];

    for await (let member of roomInfo.members) {
      const memberInfo = await getUserInfo(member);
      if (!memberInfo) continue;

      members.push(memberInfo);
    }
    setUserProfile(members);
    //console.log(turn[0])
    await setRoulettePlayerData(roomNumber, firstPlayer);
  }

  useEffect(() => {
    getRoomInfo(roomNumber, setUserInfo);
  }, []);

  const clickedPlates = async() => { //접시 눌렸을 때
    onClickCell();
    setSelectPlate(true);
    if(ServerUsers.length > point) {
      await updateRouletteTurn(roomNumber, turn[point], turn[point+1], true);
      setPoint(point++);
    } else {
      await updateRouletteTurn(roomNumber, turn[point], turn[0], true);
      setPoint(0);
    }
  }




  return (
    <>
      <div style={getCellStyle(cellStatus)} className="cell" onClick={clickedPlates}>
        <div className="cellItem" style={getCellItemStyle(cellStatus,cellPenalty)}></div>
        <div className= "Plate"></div>
      </div>
    </>
  )
})

export default Cell;