import firebase from './firebase-manager';
import React, {useState} from "react";

export default function UserInfo() {
    const [nickname, setNickname] = useState('');
    const[count,setCount] =useState(0);

    const handleOnChange = (e) => {
        setNickname(e.target.value);
    }

    const createID = () => {
        if (count == 0) {
            alert("error")
        }
        else {
            const res = firebase.firestore().collection('users').add({
            nickname: nickname,
            profile: count
            })
            setCount(0);
        }
    }

    return (
        <>
            <div>
                <h2> 닉네임 설정</h2>
                <input type="text" onChange={handleOnChange} value={nickname} />
                <h2> 캐릭터 설정 </h2>
                <button onClick={()=>{setCount(1)}}>1</button>
                <button onClick={()=>{setCount(2)}}>2</button>
                <button onClick={()=>{setCount(3)}}>3</button>
            </div>
            <div>
                <button onClick={createID}>캐릭터 생성하기</button>
            </div>
        </>

    );
}
