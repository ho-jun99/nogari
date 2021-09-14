import react, {useContext,memo,useState} from 'react';
import {TableContext,CODE, OTHER_TURN, PASS, UNPASS, END_GAME} from './RottenPlatesGame';
import {getUserInfo} from '../../firebase/users'
import userImg from './PlatesGameImage/계란말이_스탠딩.png';

import user0 from './PlatesGameImage/1.png';
import user1 from './PlatesGameImage/2.png';
import user2 from './PlatesGameImage/3.png';
import user3 from './PlatesGameImage/4.png';
import user4 from './PlatesGameImage/5.png';
import user5 from './PlatesGameImage/6.png';
import user6 from './PlatesGameImage/7.png';
import user7 from './PlatesGameImage/8.png';
import user8 from './PlatesGameImage/9.png';

const getUserImg = (num) => {
  if (num == 0) {
    return {
      backgroundImage : `url(${user0})`,
    }
  } else if (num == 1) {
    return {
      backgroundImage : `url(${user1})`,
    }
  } else if (num == 2) {
    return {
      backgroundImage : `url(${user2})`,
    }
  } else if (num == 3) {
    return {
      backgroundImage : `url(${user3})`,
    }
  } else if (num == 4) {
    return {
      backgroundImage : `url(${user4})`,
    }
  } else if (num == 5) {
    return {
      backgroundImage : `url(${user5})`,
    }
  } else if (num == 6) {
    return {
      backgroundImage : `url(${user6})`,
    }
  } else if (num == 7) {
    return {
      backgroundImage : `url(${user7})`,
    }
  } else if (num == 8) {
    return {
      backgroundImage: `url(${user8})`,
    }
  }

}

const EndBtnStyle = () => {
  return {

    
  }
}

const UnPassModal = memo((props) => {
  const {owner,selectedPlate,curUser,gameStatus,setGameStatus} = useContext(TableContext);
  const [isEndClicked,setIsEndClicked] = useState(false);

  const onClickEndBtn = () => {
    setIsEndClicked(true);
    // setGameStatus(END_GAME);
  }

  // const myID = localStorage.getItem('myId');
  // console.log(myID)
  // const userInfo = getUserInfo(myID);
  // console.log(userInfo)
  // const getProfile = userInfo.profile;
  // const getNickname = userInfo.nickname;
  // console.log(getNickname, getProfile)

  console.log(localStorage.getItem('character'));


  return (
    <div className = "UnPassModal" >
      <div className ="UnPassTrash">폐기</div>

      <div className="ImgContainer">
        <div className ="UnPassUserImg" style={getUserImg(localStorage.getItem('character'))}></div>
        <div className = "UnPassUserName">{localStorage.getItem('nickname')}</div>
      </div>

      { owner === true ?
      <div>
        <div className = "btnContainer">
          <div className= "UnPassModalBtn">다시 하기</div>
          <div className= "UnPassModalBtn" onClick={onClickEndBtn}>끝내기</div>
        </div>
          {isEndClicked && <div className="EndMessage">게임 종료</div>}
      </div>
      
      :
      <div className= "UnPassMessage">
        <div>술래가 게임 재시작 여부를 확인하는 중입니다.</div>
        <div>잠시만 기다려주세요!</div>
      </div>
      }
    </div>
  )
})

export default UnPassModal;