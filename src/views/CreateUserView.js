import React, {useState} from 'react';
import * as members from "../firebase/members"
import {Link} from "react-router-dom";

export default function CreateUserView() {
    const [nickname, setNickname] = useState(''); // 닉네임
    const[count,setCount] =useState(0); // 프로필

    const handleOnChange = (e) => { // 닉네임 변화 감지
        setNickname(e.target.value);
    }

    const createID = async () => {
        if (count == 0) { // 프로필 설정 안 했을 때 에러
            alert("error")
        }
        else {
            const userId = await members.createUser(nickname, count);
            localStorage.setItem('myId', userId);
            localStorage.setItem('nickname', nickname)

            setCount(0);

        }
    }

    return (
        <>
            <div>
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
                    <li ><Link to="/createroom" >방 만들</Link></li>
                </>
            </div>
        </>
    );
}
