import React, {useState} from 'react'
import '../css/selectLiar.css'
import Ana from '../../views/img/Ana.png'

export default function SelectLiarComponent() {

    let [userList, setUserList] = useState([
        {
            nickname: "성원이다",
            profile: Ana,
            count: 0,
        },
        {
            nickname: "홍길동",
            profile: Ana,
            count: 0,
        }
    ]);

    let user = userList.map((user, index) => {
        return (
            <li className="userContainer" key={index} onClick={() => {
                let newArr = [...userList];
                newArr[index].count += 1;
                setUserList(newArr);
            }}>
                {userList[index].count ? <div className="voteCount">{userList[index].count}</div> : <div className="noneCount">{userList[index].count}</div>}
                <img src={Ana} alt="프로필" className="userImage"/>
                <span>{user.nickname}</span>
            </li>
        )
    });
    return (
        <>
            <div className="container">
                <div className="selectLiar">라이어를 지목해주세요!</div>
                <div className="description">동점일 시 게임으로 다시 돌아갑니다.</div>
                {user}
            </div>
        </>
    )
}

