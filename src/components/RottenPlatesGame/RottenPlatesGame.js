import react, {useState,createContext,memo,useRef, useEffect} from 'react';
import Table from './Table';
import Users from './Users';
import '../css/RottenPlatesGame.css';
import UnPassModal from './UnPassModal';
import {getUserTurn} from '../../firebase/get-turn'
import {getGameData, setPlates} from "../../firebase/game-data";
import {setRoulettePlayerData} from "../../firebase/game-data";
import {Chr} from "../../views/beforeGame/Choose_Char";
import React from "react";
import {getUserInfo} from "../../firebase/users";
import {getRoomInfo} from "../../firebase/waiting-room";

export const TableContext = createContext();

export const CODE = {
  NORMAL : -1,
  CLICKED : 1,
}

export const INIT = "INIT";
export const GAME_START = "GAME_START";
export const OTHER_TURN = "OTHER_TURN";
export const MY_TRUN = "MY_TRUN";
export const END_GAME = "END_GAME";
export const PASS = "PASS";
export const UNPASS = "UNPASS";

const shuffle = (myList) => {
  const temp = [...myList];
  temp.sort( ()=> Math.random() - 0.5 );
  return temp;
}

const userColor = () => {
  return { 
    color: '#FCCE39',
    // fontSize: "24px",
  }
}
const roomNumber = localStorage.getItem('roomNumber')

const SeverPenaltyList = [
      {id: 0, penalty : "pass", status : -1},{id: 1, penalty : "pass", status : -1},{id: 2, penalty : "pass", status : -1},{id: 3, penalty : "pass", status : -1},{id: 4, penalty : "pass", status : -1},
      {id: 5, penalty : "pass", status : -1},{id: 6, penalty : "pass", status : -1},{id: 7, penalty : "pass", status : -1},{id: 8, penalty : "pass", status : -1},{id: 9, penalty : "pass", status : -1},
      {id: 10, penalty : "pass", status : -1},{id: 11, penalty : "pass", status : -1},{id: 12, penalty : "pass", status : -1},{id: 13, penalty : "pass", status : -1},
      {id: 14, penalty : "pass", status : -1},{id: 15, penalty : "pass", status : -1},{id: 16, penalty : "pass", status : -1},{id: 17, penalty : "pass", status : -1},
      {id: 18, penalty : "unpass", status : -1},{id: 19, penalty : "unpass", status : -1},{id: 20, penalty : "unpass", status : -1}
    ];


const RottenPlatesGame = memo((props) => {
  const [table,setTable] = useState(SeverPenaltyList);
  const [message,setMessage] = useState("벌칙룰렛 게임입니다.");
  const [gameStatus,setGameStatus] = useState(INIT);
  const [halted,setHalted] = useState(false);
  const [curUser,setCurUser] = useState(-1);

  const [selectedPlate,setSelectPlate] = useState({isPass : true, id : -1 ,penalty : "default"});
  const [sec,setSec] = useState(15);
  //const [owner,setOwner] = useState(true); //방장 여부

  const timer = useRef();
  const setTimer = useRef();


  const myTimer = () => {
    clearInterval(setTimer.current);
    setSec(15);
    setTimer.current = setInterval(()=>{
      setSec((prev)=> prev-1);
    },1000);
  }

  const [turn, setTurn] = useState({});

  const gamedata = async () => {
    const gameData = await getGameData(roomNumber);
    //console.log(gameData.turn)
    setTurn(gameData.turn);
  }

  useEffect(()=>{
    gamedata();
    console.log(turn)
    //console.log(turn);
  },[])


  // useEffect(()=>{
  //   const ServerUsers = getUserTurn(roomNumber);
  //   setUserlist(ServerUsers)
  //   console.log(userlist);
  // }, [])

  const [userlist,setUserlist] = useState();

  const initData = {
    table, setTable,
    message, setMessage,
    gameStatus, setGameStatus,
    halted, setHalted,
    curUser, setCurUser,
    userlist, setUserlist,
    selectedPlate, setSelectPlate, turn, setTurn, SeverPenaltyList
  }

  useEffect(()=>{
    myTimer();
    return ()=>{
      clearInterval(setTimer.current);
    }
  },[curUser]);

  useEffect(()=>{
    if(sec<=0){
      setGameStatus(UNPASS);
    }
  },[sec]);

  const [userProfile, setUserProfile] = useState([]);

  const setUserInfo = async (roomInfo) => {
    // await console.log(roomInfo);
    let members = [];

    for await (let member of roomInfo.members) {
      const memberInfo = await getUserInfo(member);
      if (!memberInfo) continue;

      members.push(memberInfo);
    }
    setUserProfile(members)
  }

  // 렌더링 시 해당 방의 참가 유저 정보를 가져오는 함수 호출
  useEffect(async () => {
    getRoomInfo(roomNumber, setUserInfo);
    //console.log(turn[0])
    //await setRoulettePlayerData(roomNumber, turn[0], 'order', true);
    const plateList = shuffle(table);
    setPlates(roomNumber, plateList);

  }, []);

  const userList = userProfile.map((user) => {

    return (
        <li style={styles.listStyle}>
          <div style={styles.userContainer}>
            <img src={Chr[user.profile]} alt='#' style={props.users[user.nickname].liar.order ? styles.startUser : styles.stopUser}/>
            <div style={styles.nickName}>{user.nickname}</div>
          </div>
        </li>

    )
  });


  // // 테스트를 위해 만든 버튼 (순서)
  // const onClickNextBtn = () => {
  //   if (gameStatus === INIT) {
  //     setHalted(true);
  //     setTable(shuffle(table));
  //     setCurUser((prev)=>prev+1);
  //     setGameStatus(GAME_START);
  //
  //   } else if(gameStatus === GAME_START) {
  //
  //     setCurUser((prev)=>prev+1);
  //     setHalted(true);
  //     setGameStatus(OTHER_TURN);

  //   } else if(gameStatus === OTHER_TURN) {
  //       if(curUser === 1) { // 1번 user 차례 다음은 2번(MY_TURN) user 차례.
  //         setCurUser((prev)=>prev+1);
  //         setGameStatus(MY_TRUN);
  //         setHalted(false);
  //         return;
  //       }
  //       if (curUser === 5 ) {
  //         setGameStatus(END_GAME);
  //         setHalted(true);
  //         return;
  //       }
  //       setCurUser((prev)=> prev+1);
  //       setHalted(true);
  //       setGameStatus(OTHER_TURN);
  //     }
  // }

  return(
    <div className="MainContainer">
      <TableContext.Provider value={initData}>
        {(gameStatus === OTHER_TURN ) || (gameStatus === MY_TRUN) || (gameStatus === GAME_START) ? <div className="message"> <span style={userColor()}>{userlist[curUser].userName}</span> 차례입니다. 접시를 선택해주세요</div> : <div className="message">썩은접시 찾기</div> }
        {gameStatus !== INIT ?
        <div className="timerContainer">
          {sec <= 5 ? <div className="timerImage" style={{visibility : "visible"}}>{sec}</div> : <div className="timerImage">{sec}</div>}
          <div className="timerMessage"> {sec} 초 남았습니다.</div> 
        </div>
        : null}
        {/* <button onClick={onClickStartBtn} className="startBtn">START</button> */}
        <Table/>
        {userList}
        {gameStatus === UNPASS && <UnPassModal userProfile={userProfile}/>}
      </TableContext.Provider>
    </div>
  )
})

const styles = {
  startUser: {
    width: 100, height: 100, border: '1px solid red',
  },
  stopUser: {
    width: 100, height: 100,
  },
  listStyle: {
    listStyleType: 'none', display: 'inline-block', border: '1px solid black', borderRadius: 5,
    width: 144, boxSizing: 'border-box', height: 218, padding: 10, margin: '86px 8px 0 0',
    backgroundColor: '#032213', color: '#FCCE39'
  },
  userContainer: {
    marginTop: 34,
  },
  nickName: {
    marginTop: 8,
  },
}



export default RottenPlatesGame;