import React, {useEffect, useState} from "react";
import './AlcoholFieldGrid.css';
import WheelImg from '../images/wheel.png';

import styled, { keyframes } from 'styled-components';


const getMapLocation = (location) => {
    if (location <= 35 && location >= 30) {
        return 35 - location;
    } else if (location <= 5 && location >= 0) {
        return location + 10;
    } else if (location % 6 === 0) {
        return 10 - (location / 6);
    } else {
        return location + (5 * (2 - parseInt(location/6)));
    }
};

function Field(props){
    return <div style={{
        ...styles.field,
        ...(props.hidden ? {visibility: 'hidden'} : {})
    }}>
        {props.children && props.children}
        {props.users && props.users.length && props.users.map((user) => user.nickname)}
        {props.content}
    </div>;
}

function isFieldHidden(fieldIndex) {
    const row = fieldIndex / 6;
    const standard = [
        !(((row - 1) * 6) % 6 === 0), // 왼쪽 찾기
        !(fieldIndex % 6 === 5), // 오른쪽 찾기
        !(fieldIndex < 6), // 윗줄 찾기
        !(30 < fieldIndex || fieldIndex > 35), // 아래줄 찾기
    ];
    return standard.filter((s) => s).length === 4;
}

const  getRotateDeg = (n, prevN) => {

    const deg = [330, 270, 210, 150, 90, 30, -330, -270, -210, -150, -90, -30 ];
    if (prevN > n) {
        console.log(prevN, n);
        return {
            transform: `rotate(359deg) rotate(${deg[n+6]}deg)`,
        }
    }else {
        console.log(prevN, n);
        return {
            transform: `rotate(${deg[n]}deg)`,
        }
    }
}

const animate = {
    animation: 'rotation 7s ease-in-out forwards'
}

const animateRotate = keyframes`
  rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(7045deg);
    }
  }
`

export function AlcoholFieldGrid() {
    const row = 6;
    const column = 6;
    // 0~35까지 만들기
    const fields = Array.from(Array(row * column).keys()).map((v) => v);
    const [players, setPlayers] = useState([ //임시 플레이어 목록
        {name : '지성', location: 0},
        {name : '정민', location: 0},
        {name : '종휘', location: 13},
        {name : '성원', location: 2},
        {name : '재혁', location: 0},
        {name : '호준', location: 0}
    ]);

    const [abc, setABC]  = useState(0)
    const [prevAbc, setPrevABC]  = useState(null)

    function getTurn() {
        const turn = Math.floor(Math.random() * 6) ;
        setPrevABC(abc);
        setABC(turn);
    }

    return (
        <div className={'AlcoholMarbleBody'}>
            <div className={'AlcoholMarbleMain'}>
                <div style={styles.fields} >
                    {fields.map((field) => {
                        const inPlayers = players.filter((i) => i.location === getMapLocation(field))

                        return <div className={'AlcoholMarbleGrid'}>
                            <Field content={getMapLocation(field)} hidden={isFieldHidden(field)} className={field}>
                                {inPlayers.map((i) => <div>{i.name}</div>)}
                            </Field>
                        </div>
                    })}
                </div>
            </div>


            <div style={styles.roulette}>
                <button onClick={getTurn} >dice</button>
                <img src={WheelImg} style={{...getRotateDeg(abc, prevAbc), ...styles.wheelAnimate}}/>
            </div>
        </div>
    );
}

const styles = {
    fields: {
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gridColumnGap: '2px',
        gridRowGap: '2px',

    },
    field: {
        width:'80px',
        height: '80px',
    },
    players : {
        display: 'grid',
        width: '10px',
        height: '5px',
        gridRowGap: '5px',
    },
    player : {
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        color: 'white'
    },

    roulette : {
        width: '220px',
        height: '220px',
        position: 'absolute',
        marginLeft:'-110px',
        marginTop:'-160px',
        left:'50%',
        top: '50%',
    },
    wheelAnimate: {
        transition: '1000ms',
        width: '220px',
        height: '220px'
    },
    rotate: [
        // { transform: 'rotate(390deg)'},
        // { transform: 'rotate(450deg)'},
        // { transform: 'rotate(510deg)'},
        // { transform: 'rotate(570deg)'},
        // { transform: 'rotate(630deg)'},
        // { transform: 'rotate(630deg)'},

        { transform: 'rotate(330deg)'},
        { transform: 'rotate(270deg)'},
        { transform: 'rotate(210deg)'},
        { transform: 'rotate(150deg)'},
        { transform: 'rotate(90deg)'},
        { transform: 'rotate(30deg)'},
    ],
};