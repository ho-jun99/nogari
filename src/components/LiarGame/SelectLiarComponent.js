import React, {useState} from 'react'
import {useHistory} from "react-router";
import '../css/selectLiar.css'
import Egg from '../../views/img/계란말이_스탠딩.png'
import Kimchi from '../../views/img/김치국수 스탠딩.png'
import Nogari from '../../views/img/노가리_스탠딩1 1.png'
import DDuk from '../../views/img/떡볶이 스탠딩.png'
import Bing from '../../views/img/빙수_스탠딩.png'
import Chicken from '../../views/img/치킨_스탠딩.png'
import NominateLiar from "./NominateLiar";

export default function SelectLiarComponent(props) {
    let [allUserSelect, setAllUserSelect] = useState(false);
    let [mostVotedUser, setMostVotedUser] = useState("");
    let [profile, setProfile] = useState("");
    let [userLiar, setUserLiar] = useState(false);

    let [userList, setUserList] = useState([
        {
            nickname: "임성원",
            profile: Egg,
            count: 0,
            isLiar: false,
        },
        {
            nickname: "박정민",
            profile: Kimchi,
            count: 0,
            isLiar: true,
        },
        {
            nickname: "김호준",
            profile: Nogari,
            count: 0,
            isLiar: false,
        },
        {
            nickname: "신재혁",
            profile: DDuk,
            count: 0,
            isLiar: false,
        },
        {
            nickname: "김지성",
            profile: Bing,
            count: 0,
            isLiar: false,
        },
        {
            nickname: "정나영",
            profile: Chicken,
            count: 0,
            isLiar: false,
        },
    ]);


    let user = userList.map((user, index) => {
        return (
            <li className="userContainer" key={index} onClick={() => {
                let newArr = [...userList];
                newArr[index].count += 1;
                setUserList(newArr);
            }}>
                {userList[index].count ? <div className="voteCount">{userList[index].count}</div> :
                    <div className="noneCount">{userList[index].count}</div>}
                <img src={user.profile} alt="프로필" className="userImage"/>
                <span>{user.nickname}</span>
            </li>
        )
    });

    //임시 게임끝
    // const test = () => {
    //     props.setIsStart(false);
    //     props.setContinueGame(false);
    // }

    // 라이어 지목 화면으로 넘어가기
    const nominate = () => {
        const temp_list = [...userList];
        let maxCount = temp_list[0].count;
        let user = temp_list[0].nickname;
        let profile = temp_list[0].profile;
        let isLiar = temp_list[0].isLiar;

        for(let i=0; i<temp_list.length; i++) {
            if (maxCount < temp_list[i].count) {
                maxCount = temp_list[i].count;
                user = temp_list[i].nickname;
                profile = temp_list[i].profile;
                isLiar = temp_list[i].isLiar;
            }
        }
        setMostVotedUser(user);
        setProfile(profile);
        setUserLiar(isLiar);
        setAllUserSelect(true);
    }
    // 모든 유저가 선택하지 않았을 때 화면
    if (!allUserSelect) {
        return (
            <>
                <div className="container">
                    <div className="selectLiar">라이어를 지목해주세요!</div>
                    <div className="description">동점일 시 게임으로 다시 돌아갑니다.</div>
                    <div className="userList">{user}</div>

                    <button onClick={nominate} className="selectBtn">선택 완료</button>
                </div>
            </>
        )
    }
    // 모든 유저가 선택했을 때 넘어가는 화면
    else {
        return (
            <>
                <NominateLiar name={mostVotedUser} profile={profile} isLiar={userLiar}/>
            </>
        )
    }
}

