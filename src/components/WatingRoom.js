import react , {useState} from 'react';
import './css/WatingRoom.css'

const makeSixArray = (temp) => {
  const arr = Array(6).fill('empty');
  for(let i=0; i<temp.length; ++i){
    arr[i] = temp[i];
  }
  return arr;
}

const userList = ['김호준','임성원','이종휘','김지성'];


const WatingRoom = () => {
  const [userId,setUserID] = useState(makeSixArray(userList));
  const [isSelected,setIsSelected] = useState(true);
  const [gameId,setGameId] = useState();

  const onClickSelectGameBtn = () => {
    if (isSelected) {
      setIsSelected(false);
    }else {
      setIsSelected(true);
    }
    
  }

  return(
    <>
      <section className="navi">
        <button className="modal">메뉴판 일러스트</button>
        <button className="modal">링크로 초대하기</button>
        <button className="modal">다른방 찾기</button>
      </section>

      <section className="Main">
        {userId.map((item,index)=> {
          return <div className="character"><p className="userName">{userId[index]}</p></div>
        })}
        
        <div className="selectedGame">{ isSelected ? null :
          <div className="selecteMessage">게임을 선택해주세요</div>
          }
          <div className="infoBtn">i</div></div>
        <button className="selectGameBtn" onClick={onClickSelectGameBtn}>게임 선택</button>
        {isSelected ? <button className="startBtn">시작</button> : <button className="startBtn" disabled>시작</button>}
        

      </section>
    </>
  )
}

export default WatingRoom;