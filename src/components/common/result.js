import React from 'react'
import userImg from '../../views/img/떡볶이 스탠딩.png'
import './result.css';

export default function Result(){
    const user={
        character: userImg,
        nickName: "Shinba"
    }
    const styleResult={
        main:{
            margin:'0 auto',
            justifyContent:'center',
            alignContent:'center',
            width: '822px',
            height: '740px',
            border:'2px #00000',
            overflow:'hidden'
        },
        title: {
            width:'823px',
            height:'130.2px',
            fontSize:'130.203px',
            fontFamily:'DungGeunMo',
            lineHeight:'130px',
            textAlign:'center',
            letterSpacing:'0.01em',
            color:'#FCCE39',
            textShadow: '-3px 0 black, 0 3px black, 3px 0 black, 0 -3px black'
        },
        character:{
            display: 'flex',
            margin:'0px auto',
            justifyContent:'center',
            alignContent:'center',
            width: '320.99px',
            height: '322.79px',
            objectFit:'cover'
        },
        nick:{
            fontFamily: 'DungGeunMo',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '36.1674px',
            lineHeight: '36px',
            letterSpacing: '0.01em',
            color: '#000000',
            textAlign:'center',
        },
        bt_wrapper:{
            display: 'flex',
            flexDirection:'row',
            alignContent: 'center',
            justifyContent: 'center',
            marginTop:'51px'
        },
    }

    return(
        <>
            <div style={styleResult.main}>
                <div className='title' style={styleResult.title}>
                    낙 제
                </div>
                <div>
                    <img style={styleResult.character} src={user.character}/>
                    <p style={styleResult.nick}>{user.nickName}</p>
                </div>


                <div style={styleResult.bt_wrapper}>
                    <button className='RetryButton'>
                        다시하기
                    </button>
                    <button className='FinishButton'>
                        끝내기
                    </button>
                </div>

            </div>


        </>
    );
}
