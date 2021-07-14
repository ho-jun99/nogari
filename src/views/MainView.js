import React from 'react';
import MainNavigator from "../components/common/MainNavigator";

export default function MainView() {

    const participants = [
        {
            nickname: "이종휘",
            is_staff: true,
            profileImg: null,
        },
        {
            nickname: "정나영",
            is_staff: false,
            profileImg: null,
        },
        {
            nickname: "임성원",
            is_staff: false,
            profileImg: null,
        },
        {
            nickname: "김호준",
            is_staff: false,
            profileImg: null,
        },
        {
            nickname: "박정민",
            is_staff: false,
            profileImg: null,
        },
        {
            nickname: "신재혁",
            is_staff: false,
            profileImg: null,
        },
        {
            nickname: "김지성",
            is_staff: false,
            profileImg: null,
        },
        {
            nickname: "차영호",
            is_staff: false,
            profileImg: null,
        },
    ]
    const people_list = participants.map((people) => (
        <li style={people.is_staff ? styles.ownerStyle : styles.listStyle}>
            <img src={require("../images/boy.png").default} alt=""/>
            <span>{people.nickname}</span>
        </li>
    ))

    return (
        <>
            <div style={{textAlign:'center',margin: '50px 0 50px 0',}}>
                게임 참여 인원
            </div>
            <div style={styles.mainContainer}>
                {people_list}
            </div>
            <MainNavigator/>
        </>
    );
}

const styles = {
    mainContainer: {
        width: 1200,
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center'
    },
    listStyle: {
        listStyleType: 'none',
        display: 'inline-block',
        border: '1px solid black',
        borderRadius: 5,
        width: '25%',
        boxSizing: 'border-box',
        height: 120,
        padding: 10,
        margin: 4,
    },
    ownerStyle: {
        listStyleType: 'none',
        display: 'inline-block',
        border: '1px solid red',
        borderRadius: 5,
        width: '25%',
        boxSizing: 'border-box',
        height: 120,
        padding: 10,
        margin: 4,
    },
}
