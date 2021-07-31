import react , {useState} from 'react';
import './css/WatingRoom.css'
import Modal from 'react-modal';
import Exit from '../components/modal/exit'
import CopyLink from '../components/modal/copylink'

const makeSixArray = (temp) => {
  const arr = Array(6).fill('empty');
  for(let i=0; i<temp.length; ++i){
    arr[i] = temp[i];
  }
  return arr;
}
const userList = ['김호준','임성원','이종휘','김지성'];
const gameList = {
  0 : {
    id : 0,
    info : "게임을 선택해주세요"
  },
  1 : {
    id : 1,
    info : "이게임은 첫번째 재밌는 게임입니다."
  },
  2 : {
    id : 2,
    info : "이게임은 두번째 재밌는 게임입니다."
  },
  3 : {
    id : 3,
    info : "이게임은 세번째 재밌는 게임입니다."
  },
  4 : {
    id : 4,
    info : "이게임은 네번째 재밌는 게임입니다."
  },
  5 : {
    id : 5,
    info : "이게임은 다섯번째 재밌는 게임입니다."
  },
  6 : {
    id : 6,
    info : "이게임은 여섯번째 재밌는 게임입니다."
  }
}

Modal.setAppElement('#root');
const WatingRoom = () => {
  const [userId,setUserID] = useState(makeSixArray(userList));
  const [isSelected,setIsSelected] = useState(true);
  const [isInfoOpen,setIsInfoOpen] =useState(false);
  const [isMenuOpen,setIsMenuOpen] = useState(false);
  const [selectedGame,SetSelectedGame] = useState(0);

  // 다른 방 찾기, 링크로 초대하기 버튼에 관한 변수, 함수
  const [exitModalOpen, setExitModalOpen] = useState(false);
  const [linkCopyModalOpen, setLinkCopyModalOpen] = useState(false);
  const exitOpenModal = () => {
    setExitModalOpen(true);
  }
  const exitCloseModal = () => {
    setExitModalOpen(false);
  }
  const linkCopyOpenModal = () => {
    setLinkCopyModalOpen(true);
    navigator.clipboard.writeText("https://www.naver.com/");
  }
  const linkCopyCloseModal = () => {
    setLinkCopyModalOpen(false);
  }

  const onClickSelectGameBtn = () => {
    if (isSelected) {
      setIsSelected(false);
    }else {
      setIsSelected(true);
    }

  }

  const isMenuOpenFun = () => {
    setIsMenuOpen((prev)=>{
      console.log(!prev);
      return !prev;
    });
  }
  const isInfoOpenFun = () => {
    setIsInfoOpen((prev)=>{
      return !prev;
    });
  }

  return(
    <>
      <section className="navi">
        <button className="modal" onClick={isMenuOpenFun}>메뉴판 일러스트</button>
        <button className="modal" onClick={linkCopyOpenModal}>링크로 초대하기</button>
        <button className="modal" onClick={exitOpenModal}>다른방 찾기</button>
        <Exit open={exitModalOpen} close={exitCloseModal}></Exit>
        <CopyLink open={linkCopyModalOpen} close={linkCopyCloseModal}></CopyLink>
        <Modal id="menuModal" isOpen={isMenuOpen} onRequestClose={()=>setIsMenuOpen(false)} style={
          {
            overlay: {
            position: 'absolute',
            top: '150px',
            left: '470px',
            right: 0,
            bottom: 0,
            width : '1000px',
            height : '770px',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            zIndex : 100
          },
            content: {
            position: 'absolute',
            top: '40px',
            left: '40px',
            right: '40px',
            bottom: '40px',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px'
            }
        }}>
          <div id="backBtn" onClick={isMenuOpenFun}>X</div>
          <div className="menuWraper">
            <div>베스트메뉴 <img src={require("../images/bestMenu.png").default} alt=""/></div>
            <div>2메뉴</div>
            <div>3메뉴</div>
            <div>4메뉴</div>
            <div>5메뉴</div>
            <div>6메뉴</div>
          </div>
        </Modal>
      </section>

      <section className="Main">
        {userId.map((item,index)=> {
          return <div className="character"><p className="userName">{userId[index]}</p></div>
        })}
        <div className="selectedGame">{ isSelected ? null :
          <div className="selecteMessage">게임을 선택해주세요</div>
          }
          <div className="infoBtn" onClick={isInfoOpenFun}>i</div>
          <Modal id="infoModal" isOpen={isInfoOpen} onRequestClose= {()=>setIsInfoOpen(false)}style={
          {
            overlay: {
            position: 'absolute',
            top: '400px',
            left: '470px',
            right: 0,
            bottom: 0,
            width : '1000px',
            height : '300px',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            zIndex : 99
          }}
          }>
            {gameList[selectedGame].info}
          </Modal>
          </div>
        <button className="selectGameBtn" onClick={onClickSelectGameBtn}>게임 선택</button>
        {isSelected ? <button className="startBtn">시작</button> : <button className="startBtn" disabled>시작</button>}
      </section>
    </>
  )
}

export default WatingRoom;
