import React, {useState, useEffect} from 'react';
import './css/find.css'
import LinkModal from "./Link_input";
import * as rooms from "../../firebase/rooms";
import {addMember, getRoomInfo} from "../../firebase/waiting-room";
import firebase from "firebase";
import {getUserInfo} from "../../firebase/users";
import {Chr, Ch_name} from './Choose_Char';

export default function Find({history}) {
    const [userdata, setUserData] = useState({});
    useEffect(() => {
       async function exec(){
           const userId = localStorage.getItem('myId');
           const userdata = await getUserInfo(userId);
           setUserData(userdata);
       }

        exec();
    }, []);

    const title={
        fontSize:"20px",
        fontFamily: "DungGeunMo",
        lineHeight: "20px",
        color: "#0C8247",
        marginTop:"30px"
    }
    const subtitle={
        fontSize:"13px",
        color:"#0C8247;",
        fontFamily:"DungGeunMo",
        lineHeight:"16px",
        marginTop:"10px"
    }
    const [ modalOpen, setModalOpen ] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }

    //방 만들기 버튼 관련
    function getUserID() {
        const userID = localStorage.getItem('myId'); // 방을 만드는 유저의 아이디
        return userID;
    }

    function getRoomNumber() {
        const userRoomNumber = localStorage.getItem('roomNumber');
        return userRoomNumber;
    }

    const makeRoom = async () => {
        const roomNumber = await rooms.createRoom(); // 방만들기
        localStorage.setItem('roomNumber', roomNumber); // 룸 넘버 웹에 저장
        const myId = getUserID();
        await firebase.firestore().collection("rooms").doc(`${roomNumber}`).set({
            game:"",
            members: [myId],
            captain: myId,

        }, {merge:true});

        await firebase.firestore().collection("game").doc(`${roomNumber}`).set({
            liar: {
                liarword:"",
            },
            rottenPlates : {

            }
        }, {merge:true});

        console.log(roomNumber);
        history.push(`/rooms/${roomNumber}`);
    }

    return (
        <>
            <div className="find_container">
                <div className="find_main">
                    <div style={title}>
                        대기실
                        <div style={subtitle}>
                            <br/>새로운 방을 만들어 친구들을 초대하거나<br/>
                            친구가 보내준 링크를 타고 방으로 입장해보세요.
                        </div>
                        <div className="make_wrapper">
                            <div className="make">
                                <div style={{fontSize:"45px",paddingTop:"30.59px",lineHeight:"45px",letterSpacing: "0.065em",fontFamily: "DungGeunMo" }} onClick={makeRoom}>방 만들기</div>
                                <div style={{fontSize:"11px",paddingTop:"13.89px"}}>방장이 되어 다른친구들을 초대해보세요!</div>
                            </div>
                            <div className="make" onClick={openModal}>
                                <div style={{fontSize:"45px",paddingTop:"30.59px",lineHeight:"45px",letterSpacing: "0.065em",fontFamily: "DungGeunMo" }}>링크 입력</div>
                                <div style={{fontSize:"11px",paddingTop:"13.89px"}}>친구가 보내준 링크를 입력하여 게임에 참여하세요!</div>
                            </div>
                        </div>
                    </div>

                    <div className="RightBox">
                        <div className="">
                            {userdata?.profile && <img src={Chr[userdata?.profile || 1]} style={{width: '100%'}} alt=""/>}
                        </div>
                        <div className="NameBox">
                            <a style={{
                                position:"absolute",
                                paddingTop:"13px",
                                paddingLeft:"21px",
                                fontFamily: "DungGeunMo",
                                fontSize: "14px",
                                lineHeight: "19px",
                                color: " #FCCE39"}}>{Ch_name[userdata?.profile || 1]}</a>
                            <a style={{
                                position:"absolute",
                                paddingTop:"30px",
                                paddingLeft:"15px",
                                fontFamily: "DungGeunMo",
                                fontSize: "33px",
                                lineHeight: "53px",
                                letterSpacing: "0.01em",
                                color: "#FCCE39"}}>{userdata.nickname}</a>
                        </div>

                    </div>
                    <LinkModal open={modalOpen} close={closeModal}/>
                </div>
            </div>
        </>
    );
}
