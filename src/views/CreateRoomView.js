import React, {useState} from 'react';
import * as rooms from "../firebase/rooms";
import firebase from "firebase";
import {Link} from "react-router-dom";

export default function CreateRoomView() {
    const makeRoom = async () => {
        const roomNumber = await rooms.createRoom(); // 방만들기
        localStorage.setItem('roomNumber', roomNumber); // 룸 넘버 웹에 저장

        const newUser = localStorage.getItem('myId'); // 방을 만드는 유저의 아이디
        const userCharacter = localStorage.getItem('character')
        const userNickname = localStorage.getItem('nickname')
        firebase.firestore().collection("rooms").doc(`${roomNumber}`).collection("members").doc(`${newUser}`).set(
            {nickname:userNickname, profile: userCharacter, badges: {alcohol:0, roulette:0, liar:0}}
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

    const inRoom = async () => {
        const goUser = localStorage.getItem('myId'); // 지금 접속 중인 유저 아이디
        const goUserNickname = localStorage.getItem('nickname')
        const goUserCharacter = localStorage.getItem('character')
        firebase.firestore().collection("rooms").doc(`${goRoom}`).collection("members").doc(`${goUser}`).set(
            {nickname:goUserNickname, profile:goUserCharacter, badges: {alcohol:0, roulette:0, liar:0}}
        )
    }

    // 뱃지 개수 늘리기
    const badges1 = () => {
        const newRoom = localStorage.getItem('roomNumber')
        const newUser = localStorage.getItem('myId');
        firebase.firestore().collection("rooms").doc( `${newRoom}`).collection("members").doc(`${newUser}`).set({

            badges : { alcohol: firebase.firestore.FieldValue.increment(1)}
        }, {merge:true});
    }
    const badges2 = () => {
        const newRoom = localStorage.getItem('roomNumber')
        const newUser = localStorage.getItem('myId');
        firebase.firestore().collection("rooms").doc( `${newRoom}`).collection("members").doc(`${newUser}`).set({

            badges : { roulette: firebase.firestore.FieldValue.increment(1)}
        }, {merge:true});
    }
    const badges3 = () => {
        const newRoom = localStorage.getItem('roomNumber')
        const newUser = localStorage.getItem('myId');
        firebase.firestore().collection("rooms").doc( `${newRoom}`).collection("members").doc(`${newUser}`).set({

            badges : { liar: firebase.firestore.FieldValue.increment(1)}
        }, {merge:true});
    }


    const roomId = localStorage.getItem('roomNumber');
    return (
        <>
            <div>
                <>
                    <div>
                        <button onClick={makeRoom}>방 만들기</button>
                        <Link to={'/rooms/'+`${roomId}`}>방 입장</Link>
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
                </>
            </div>
        </>
    )
}