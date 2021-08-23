import React, {useState, useEffect} from 'react';
import '../components/css/WatingRoom.css'
import Modal from 'react-modal';
import Exit from '../components/modal/exit'
import CopyLink from '../components/modal/copylink'
import SelectGame from "../components/modal/selectGame";
import {getRoomInfo} from "../firebase/waiting-room";
import { getUserInfo } from '../firebase/users';
import firebase from "firebase";
import {setPlayers} from "../firebase/game-data";

const menuModalStyle = {
    overlay: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      width: '881px',
    	height: '679px',
      backgroundColor: 'rgba(0, 0, 0, 0)',
      zIndex: 100,
      left: '51%',
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
			width: '750px',
      padding: '10px',
      height: '578.04px',
      backgroundColor: '#1B9659',
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
        console.log(roomInfo)
        // const captainInfo = await getUserInfo(roomInfo.captain);
        // setCaptain(captainInfo);
        let members = [];
        let membersGamedata = [];
        // console.log(roomInfo);
        for await (const member of roomInfo.members) {
            const memberInfo = await getUserInfo(member);
            if (!memberInfo) continue;
            members.push(memberInfo);
        }
        const memberProps = members.map((member) => member.nickname);
        console.log(memberProps);
        setUsers(memberProps);

        for await (const member of memberProps) {
            const gameMember = {member, liar: {isliar: false, }, }
            membersGamedata.push(gameMember);
        }
        await setPlayers(match.params.roomId, membersGamedata);
    }

    useEffect(() => {
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
                            <div className="menuTitle">오늘의<br/>베스트 안주는</div>
                            <div className="menuRankContainer">

                                <div className="menuRankLeft">
                                    <div className="LeftName">1위 <br/>청춘 김민석</div>
                                    <div className="LeftTitle">마른 오징어</div>
                                    <div className="LeftImage">이미지</div>
                                    <div className="LeftBadgeContainer">
                                        받은뱃지
																				<div className="LeftBadges">
																					<div className="LeftBadge">+</div>
																					<div className="LeftBadge">+</div>
																					<div className="LeftBadge">+</div>
																				</div>
                                    </div>
                                </div>

                                <div className="menuRankRight">

                                    <div className="menuRankRightWrapper">
                                        <div className="menuRangkRightContainer">
                                        
                                            <div className="rightRank">2위</div>
                                            <div className="rightTitle">청춘 김민석</div>
                                            <div className="rightBadgeContainer">
                                                <div className="rightBadgeTitle">받은뱃지</div>
																								<div className="rightBadges">
																									<div className="rightBadge">+</div>
																									<div className = "rightBadge">+</div>
																									<div className = "rightBadge">+</div>
																									<div className = "rightBadge">+</div>
																								</div>
                                                
                                            </div>
                                        </div>
                                        <div className="rightImage">이미지</div>
                                    </div>

                                    <div className="menuRankRightWrapper">
                                        <div className="menuRangkRightContainer">
                                        
                                            <div className="rightRank">2위</div>
                                            <div className="rightTitle">청춘 김민석</div>
                                            <div className="rightBadgeContainer">
                                                <div className="rightBadgeTitle">받은뱃지</div>
																								<div className="rightBadges">
																									<div className="rightBadge">+</div>
																									<div className = "rightBadge">+</div>
																									<div className = "rightBadge">+</div>
																									<div className = "rightBadge">+</div>
																								</div>
                                                
                                            </div>
                                        </div>
                                        <div className="rightImage">이미지</div>
                                    </div>

                                    <div className="menuRankRightWrapper">
                                        <div className="menuRangkRightContainer">
                                        
                                            <div className="rightRank">2위</div>
                                            <div className="rightTitle">청춘 김민석</div>
                                            <div className="rightBadgeContainer">
                                                <div className="rightBadgeTitle">받은뱃지</div>
																								<div className="rightBadges">
																									<div className="rightBadge">+</div>
																									<div className = "rightBadge">+</div>
																									<div className = "rightBadge">+</div>
																									<div className = "rightBadge">+</div>
																								</div>
                                                
                                            </div>
                                        </div>
                                        <div className="rightImage">이미지</div>
                                    </div>
                                </div>
                            </div>
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