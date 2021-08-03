import firebase from './firebase-manager';
import React, {useState} from "react";

export default function UserInfo() {
    const [nickname, setNickname] = useState(''); // 닉네임
    const[count,setCount] =useState(0); // 프로필

    const handleOnChange = (e) => { // 닉네임 변화 감지
        setNickname(e.target.value);
    }

    const createID = () => {
        if (count == 0) { // 프로필 설정 안 했을 때 에러
            alert("error")
        }
        else {
            const res = firebase.firestore().collection('users').add({ // 닉네임+프로필 데이터 추가
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
