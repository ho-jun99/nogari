import React, {useState} from 'react';
import * as rooms from "../firebase/rooms";
import firebase from "firebase";
import {Link} from "react-router-dom";

export default function CreateRoomView() {
    function getUserID() {
        const userID = localStorage.getItem('myId'); // 방을 만드는 유저의 아이디
        return userID;
    }
    function getUserNickname() {
        const userNickname = localStorage.getItem('nickname');
        return userNickname;
    }

    function getUserCharacter() {
        const userCharacter = localStorage.getItem('character');
        return userCharacter;
    }

    function getRoomNumber() {
        const userRoomNumber = localStorage.getItem('roomNumber');
        return userRoomNumber;
    }

    const makeRoom = async () => {
        const roomNumber = await rooms.createRoom(); // 방만들기
        localStorage.setItem('roomNumber', roomNumber); // 룸 넘버 웹에 저장

        firebase.firestore().collection("rooms").doc(`${roomNumber}`).collection("members").doc(`${getUserID()}`).set(
            {nickname:getUserNickname(), profile: getUserCharacter(), badges: {alcohol:0, roulette:0, liar:0}}
        )
        firebase.firestore().collection("rooms").doc(`${roomNumber}`).set({
            game:""
        }, {merge:true});
    }

    // 닉네임 변화 감지
   const [goRoom,setGoRoom] = useState('')
    const handleOnChange = (e) => {
        setGoRoom(e.target.value);
    }

    const inRoom = () => {
        const checkRoomNumber = firebase.firestore().collection('rooms').get().then((snapshot) => {
            snapshot.forEach(doc => {
                if (doc.id == goRoom) { // 이미 생성된 룸넘버 입력 시에만 웹스토리지 생성
                    localStorage.setItem('roomNumber', goRoom);
                    firebase.firestore().collection("rooms").doc(`${goRoom}`).collection("members").doc(`${getUserID()}`).set(
                        {nickname:getUserNickname(), profile:getUserCharacter(), badges: {alcohol:0, roulette:0, liar:0}})
                }
            })
            if (getRoomNumber()!=goRoom) {
                alert('에러')
           }
        })
    }

    // 뱃지 개수 늘리기
    const badges1 = () => {
        firebase.firestore().collection("rooms").doc( `${getRoomNumber()}`).collection("members").doc(`${getUserID()}`).set({
            badges : { alcohol: firebase.firestore.FieldValue.increment(1)}
        }, {merge:true});
    }
    const badges2 = () => {
        firebase.firestore().collection("rooms").doc( `${getRoomNumber()}`).collection("members").doc(`${getUserID()}`).set({
            badges : { roulette: firebase.firestore.FieldValue.increment(1)}
        }, {merge:true});
    }
    const badges3 = () => {
        firebase.firestore().collection("rooms").doc( `${getRoomNumber()}`).collection("members").doc(`${getUserID()}`).set({
            badges : { liar: firebase.firestore.FieldValue.increment(1)}
        }, {merge:true});
    }

    const resetInfo = () => {
       // 웹에서는 컬렉션 삭제 지원 안 한대여. 그래서 일단 웹스토리지만 초기화
        localStorage.setItem('roomNumber','')
    }

    const getget = () => {
        firebase.firestore().collection("rooms").doc( `${getRoomNumber()}`)
    }

    return (
        <>
            <div>
                <>
                    <div>
                        <button onClick={makeRoom}>방 만들기</button>
                        <Link to={'/rooms/'+`${getRoomNumber()}`}>방 입장</Link>
                    </div>
                    <div>
                        <input onChange={handleOnChange}/>
                        <button onClick={inRoom}>Go</button>
                    </div>
                    <div>
                        <button onClick={badges1}>알콜</button>
                        <button onClick={badges2}>룰렛</button>
                        <button onClick={badges3}>라이어</button>
                    </div>
                    <div>
                        <button onClick={resetInfo}>exit</button>
                        <button onClick={getget}>get</button>
                    </div>
                </>
            </div>
        </>
    )
}