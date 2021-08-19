import React, {useState, useEffect} from 'react';
import '../components/css/WatingRoom.css'
import Modal from 'react-modal';
import Exit from '../components/modal/exit'
import CopyLink from '../components/modal/copylink'
import SelectGame from "../components/modal/selectGame";
import {getRoomInfo} from "../firebase/waiting-room";
import { getUserInfo } from '../firebase/users';

const menuModalStyle = {
    overlay: {
        position: 'absolute',
          // top: '150px',
          // left: '470px',
          right: 0,
          bottom: 0,
          width: '1000px',
          height: '770px',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          zIndex: 100,
          left: '50%',
          // top: '5%',
          transform: 'translateX(-50%)',
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
};

Modal.setAppElement('#root');
export default function NewWaitingRoom({ match }) {
    const [users, setUsers] = useState([]);

    const [room, setRoom] = useState({
        isSelected: false,
        isInfoOpen: false,
        isMenuOpen: false,
        selectedGameName: '',
        selectedGameRule: '',
        exitModalOpen: false,
        linkCopyModalOpen: false,
        selectGameModal: false,
    });
    const setRoomState = (key, value) => setRoom({ ...room, [key]: value });

    // 다른 방 찾기, 링크로 초대하기 버튼에 관한 변수, 함수
    const exitModal = (isOpen) => setRoomState('exitModalOpen', isOpen);
    const linkCopyModal = (isOpen) => {
        setRoomState('linkCopyModalOpen', isOpen)
        if (isOpen) {
            navigator.clipboard.writeText("https://www.naver.com/");
        }
    }

    // 게임 선택 버튼에 관한 변수, 함수
    const selectGameModal = (isOpen) => setRoomState('selectGameModal', isOpen);

    const isMenuOpenFun = () => setRoomState('isMenuOpen', !room.isMenuOpen);
    const isInfoOpenFun = () => setRoomState('isInfoOpen', !room.isInfoOpen);

    const getFromSelectMenu = (data) => {
      console.log(data.gameName);
      console.log(data.description);
      const roomData = {
        ...room,
        selectedGameName: data.gameName,
        selectedGameRule: data.description,
        isSelected: true,
      };
      setRoom(roomData);
      console.log(room);

    }

    // 새로운 참여자가 발생하거나 룸 정보가 바뀔때 실행되는 함수
    const changedRoomInfo = async (roomInfo) => {
        const captainInfo = await getUserInfo(roomInfo.captain);
        // setCaptain(captainInfo);
        let members = [];
        // console.log(roomInfo);
        for await (const member of roomInfo.members) {
            const memberInfo = await getUserInfo(member);
            if (!memberInfo) continue;
            members.push(memberInfo);
        }
        const memberProps = members.map((member) => member.nickname);
        setUsers(memberProps);
    };

    useEffect(() => {
        console.log(match.params.roomId);
        getRoomInfo(match.params.roomId, changedRoomInfo);
    }, []);

    return (
        <>
            <div id="mainWrap">
                <section className="navi">
                    <div className="btnContainer">
                        <button className="modal" onClick={isMenuOpenFun}>메뉴판 일러스트</button>
                        <button className="modal" onClick={() => linkCopyModal(true)}>링크로 초대하기</button>
                        <button className="modal" onClick={() => exitModal(true)}>다른방 찾기</button>
                    </div>

                    <Exit open={room.exitModalOpen} close={() => exitModal(false)}></Exit>
                    <CopyLink open={room.linkCopyModalOpen} close={() => linkCopyModal(false)}></CopyLink>
                    <Modal
                      id="menuModal"
                      isOpen={room.isMenuOpen}
                      onRequestClose={() => setRoomState('isMenuOpen', false)}
                      style={menuModalStyle}>
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
                    <div className="char1">
                        {
                            users.filter((item, index) => index < 3)
                              .map((item, index) => {
                                  return <div key={index}>
                                      <div className="character"></div>
                                      <div className="userName">{item}</div>
                                  </div>;
                              })
                        }
                    </div>

                    <div className="gameMain">
                        <button className="selectGameBtn" onClick={() => selectGameModal(true)}>게임 선택</button>
                        <div className="selectedGame">{room.isSelected ? room.selectedGameName :
                            <div className="selecteMessage">
                              {room.selectedGameName}
                              게임을 선택해주세요
                            </div>
                        }
                            {/* <div className="infoBtn" onClick={isInfoOpenFun}>i</div>
                    <Modal id="infoModal" isOpen={isInfoOpen} onRequestClose={() => setIsInfoOpen(false)} style={
                        {
                            overlay: {
                                position: 'absolute',
                                top: '400px',
                                left: '470px',
                                right: 0,
                                bottom: 0,
                                width: '1000px',
                                height: '300px',
                                backgroundColor: 'rgba(0, 0, 0, 0)',
                                zIndex: 99
                            }
                        }
                    }>
                        {selectedGameRule ? <div>{selectedGameRule}</div> : <div>게임을 먼저 선택해 주세요.</div>}
                    </Modal> */}
                        </div>
                        {room.isSelected ? <button className="startBtn">시작</button> :
                            <button className="startBtn" disabled>시작</button>}
                    </div>

                    <div className="char2">
                        {
                            users.filter((item, index) => index >= 3)
                              .map((item, index) => {
                                  return <div key={index}>
                                      <div className="character"></div>
                                      <div className="userName">{item}</div>
                                  </div>;
                              })
                        }
                    </div>


                </section>
                <SelectGame open={room.selectGameModal} close={() => selectGameModal(false)}
                            parentFunction={getFromSelectMenu}></SelectGame>
            </div>

        </>
    )
}