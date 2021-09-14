import './result.css'
import React, {useEffect, useState} from 'react'
import Eggroll from '../../views/img/계란말이_스탠딩.png'
import {Chr} from "../../views/beforeGame/Choose_Char";
import {useHistory} from "react-router";
import {getUserInfo} from "../../firebase/users";
import {getRoomInfo} from "../../firebase/waiting-room";
import {useLocation} from "react-router";
import VoteBadgeComponent from "../voteBadge/VoteBadgeComponent";
import {load} from "dotenv";

export default function Result(props){

    const [exitGame, setExitGame] = useState(false);

    const location = useLocation();


    const history = useHistory();
    // const [fail, setFail] = useState({
    //     character:"",
    //     nickname:""
    // });
    //
    // const [userProfile, setUserProfile] = useState([]);
    //
    // // 게임에 참가한 유저들 프로필 이미지, 이름 가져오기
    // const setUserInfo = async (roomInfo) => {
    //     // await console.log(roomInfo);
    //     let members = [];
    //
    //     for await (let member of roomInfo.members) {
    //         const memberInfo = await getUserInfo(member);
    //         if (!memberInfo) continue;
    //
    //         members.push(memberInfo);
    //     }
    //     setUserProfile(members)
    // }
    // player !== undefined && console.log(Object.entries(player))
    //
    // // 렌더링 시 해당 방의 참가 유저 정보를 가져오는 함수 호출
    // useEffect(() => {
    //     getRoomInfo(roomNumber, setUserInfo);
    // }, []);
    // player !== undefined && console.log(player);

    const click=()=>{
        setExitGame(true);
        // const setExitGame = location.state.setExitGame;
        // setExitGame(true);

    }

    const click2 = () => {
        history.push(`/rooms/${localStorage.getItem('roomNumber')}`);
    }


if(!exitGame) {
    return(
        <>
            <div style={style.main}>
                <span style={style.title}> 성공 </span>
                <img src={Chr[localStorage.getItem('character')]} style={style.char}/>
                <span style={style.Nick}>{localStorage.getItem('nickName')}</span>
                <div style={style.BtWrapper}>
                    <button className='RetryButton' onClick={click2}>
                        다시 하기
                    </button>
                    <button onClick={click} className='FinishButton'>
                        끝내기
                    </button>
                </div>
            </div>
        </>
    );
}else {
    return <>
        <VoteBadgeComponent/>
    </>
}
}
const style={
    main:{
        overflow:'hidden',
        margin:'0 auto',
        width: '822px',
        height: '740px',
        position: 'relative',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        padding:'5%'
    },
    title:{
        fontFamily:'DungGeunMo',
        fontWeight:'normal',
        fontStyle:'normal',
        fontSize:'144px',
        lineHeight:'144px',
        textAlign:'center',
        color:'#FCCE39',
        textShadow:'-3px 0 black, 0 3px black, 3px 0 black, 0 -3px black'
    },
    char:{
        width: '433px',
        height: '516px',
        objectFit:'cover',
        display: 'block',
        margin:'-72px auto'
    },
    Nick:{
        marginTop: '-37px',
        fontFamily:'DungGeunMo',
        fontWeight:'normal',
        fontStyle:'normal',
        fontSize:'40px',
        lineHeight:'40px',
        textAlign:'center',
        letterSpacing:'0.01em',
        color:'#000000'
    },
    BtWrapper:{
        marginTop:'38px',
        display:'flex',
        justifyContent:'center'
    }

}
