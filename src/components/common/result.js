import './result.css'
import React from 'react'
import Eggroll from '../../views/img/계란말이_스탠딩.png'
export default function Result(){
    const user={
        character:Eggroll,
        nickname:'shinba'
    }

    return(
        <>
            <div style={style.main}>
                <span style={style.title}> 낙제 </span>
                <img src={user.character} style={style.char}/>
                <span style={style.Nick}>{user.nickname}</span>
                <div style={style.BtWrapper}>
                    <button className='RetryButton'>
                        다시 하기
                    </button>
                    <button className='FinishButton'>
                        끝내기
                    </button>
                </div>
            </div>


        </>
    );
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
