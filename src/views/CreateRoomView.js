import React, {useState} from 'react';
import * as rooms from "../firebase/rooms";
import firebase from "firebase";

export default function CreateRoomView() {
    const makeRoom = async () => {
        const roomNumber = await rooms.createRoom(); // 방만들기
        localStorage.setItem('roomNumber', roomNumber); // 룸 넘버 웹에 저장

        const newUser = localStorage.getItem('myId'); // 방을 만드는 유저의 아이디
        const userCharacter = localStorage.getItem('character')
        const userNickname = localStorage.getItem('nickname')
        firebase.firestore().collection("rooms").doc(`${roomNumber}`).collection("members").doc(`${newUser}`).set(
            {nickname:userNickname, profile: userCharacter}
        )
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
            {nickname:goUserNickname, profile:goUserCharacter}
        )
    }

    const check = () => { // 필드 다루기 위한 더미 데이터! 무시하세요~
        firebase.firestore().collection("rooms").doc( "pu0cNr4uG9xXaGXwuTIp").collection("members").doc('1j2LRAjQ3oMMuCUDjn6t').set({
            name: 'ab'
        }, {merge:true});
    }

    return (
        <>
            <div>
                <>
                    <div>
                        <button onClick={makeRoom}>방 만들기</button>
                    </div>
                    <div>
                        <input onChange={handleOnChange}/>
                        <button onClick={inRoom}>Go</button>
                        <button onClick={check}>cc</button>
                    </div>
                </>
            </div>
        </>
    )
}