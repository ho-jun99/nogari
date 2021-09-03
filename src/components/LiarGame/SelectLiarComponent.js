import React, {useState} from 'react'
import {useHistory} from "react-router";
import '../css/selectLiar.css'
import {getUserInfo} from "../../firebase/users";
import Egg from '../../views/img/계란말이_스탠딩.png'
import Kimchi from '../../views/img/김치국수 스탠딩.png'
import Nogari from '../../views/img/노가리_스탠딩1 1.png'
import DDuk from '../../views/img/떡볶이 스탠딩.png'
import Bing from '../../views/img/빙수_스탠딩.png'
import Chicken from '../../views/img/치킨_스탠딩.png'
import {updateUserData} from "../../firebase/games/liar";

export default function SelectLiarComponent(props) {

    const roomNumber = localStorage.getItem('roomNumber');
    const myNickname = localStorage.getItem('nickname');

    const [profile, setProfile] = useState("");

    const usersArray = Object.entries(props.users);

    let user = usersArray.map((user, index) => {
        const getUser = async ()=> {
            const userInfo = await getUserInfo(user[1].member);
            // console.log(userInfo);
            setProfile(userInfo.profile)
        }
        getUser();
        return (
            <li className="userContainer" key={index} onClick={async () => {
                props.users[myNickname].liar.count +=1;
                await updateUserData(roomNumber, props.users);

            }}>
                {props.users[myNickname].liar.count!=0 ? <div className="voteCount">{props.users[myNickname].liar.count}</div> : <div className="noneCount">{}</div>}
                <img src='#' alt={profile}  className="userImage"/>
                <span>{user[0]}</span>
            </li>
        )
    });

    //임시 게임끝
    const test = () => {
        props.setIsStart(false);
        props.setContinueGame(false);
    }
    return (
        <>
            <div className="container">
                <div className="selectLiar">라이어를 지목해주세요!</div>
                <div className="description">동점일 시 게임으로 다시 돌아갑니다.</div>
                {user}
                <button onClick={test} className="selectBtn">선택 완료</button>
            </div>
        </>
    )
}

