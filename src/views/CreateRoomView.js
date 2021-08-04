import React, {useState} from 'react';
import * as rooms from "../firebase/rooms";
import firebase from "firebase";

function CreateRoomView() {
    const makeRoom = async () => {
        const roomNumber = await rooms.createRoom(); // 방만들기
        localStorage.setItem('roomNumber', roomNumber); // 룸 넘버 웹에 저장

        const newUser = localStorage.getItem('myId'); // 방을 만드는 유저의 아이디
        const userNickname = localStorage.getItem('nickname')
        firebase.firestore().collection("rooms").doc(`${roomNumber}`).collection("members").doc(`${newUser}`).set(
            {nickname:userNickname, profile: "유저 정보 어캐 가져옴?"}
        )
    }

    // 닉네임 변화 감지
   const [goRoom,setGoRoom] = useState('')
    const handleOnChange = (e) => {
        setGoRoom(e.target.value);
    }

    const inRoom = async () => {
        const goUser = localStorage.getItem('myId'); // 지금 접속 중인 유저 아이디

        const gouserNickname = localStorage.getItem('nickname')
        firebase.firestore().collection("rooms").doc(`${goRoom}`).collection("members").doc(`${goUser}`).set(
            {nickname:gouserNickname, profile: "유저 정보 어캐 가져옴?"}
        )
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
                    </div>
                </>
            </div>
        </>
    )
}

export default CreateRoomView;