import React, {useEffect, useState} from 'react';
import MainNavigator from "../components/common/MainNavigator";
import {getRoomInfo, getUserInfo} from "../firebase/waiting-room";



export default function WaitingRoomView({ match }) {
    const [captain, setCaptain] = useState('');
    const [participants, setParticipants] = useState([]);
    const changedRoomInfo = async (roomInfo) => {
        const captainInfo = await getUserInfo(roomInfo.captain);
        setCaptain(captainInfo);
        let members = [];

        for await (const member of roomInfo.members) {
            const memberInfo = await getUserInfo(member);
            members.push(memberInfo);
        }
        const memberProps = members.map((member) => ({ ...member, is_staff: false }));
        setParticipants(memberProps);


    };

    useEffect(() => {
        getRoomInfo(match.params.roomId, changedRoomInfo);
    }, []);


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
                <div>
                    방장 : {captain.nickname}
                </div>
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
