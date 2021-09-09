import React, {useEffect, useState} from "react";
import './AlcoholFieldGrid.css';
// import WheelImg from '../images/wheel.png';
import { Wheel } from 'react-custom-roulette'

import styled, {keyframes} from 'styled-components';


const getMapLocation = (location) => {
    if (location <= 35 && location >= 30) {
        return 35 - location;
    } else if (location <= 5 && location >= 0) {
        return location + 10;
    } else if (location % 6 === 0) {
        return 10 - (location / 6);
    } else {
        return location + (5 * (2 - parseInt(location / 6)));
    }
};

function Field(props) {
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

const getRotateDeg = (n, prevN) => {

    const deg = [330, 270, 210, 150, 90, 30, -330, -270, -210, -150, -90, -30];
    if (prevN > n) {
        console.log(prevN, n);
        return {
            transform: `rotate(359deg) rotate(${deg[n + 6]}deg)`,
        }
    } else {
        console.log(prevN, n);
        return {
            transform: `rotate(${deg[n]}deg)`,
        }
    }
}


export function AlcoholFieldGrid() {

    // 라이브러리 이용한 룰렛 구현
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);

    const handleSpinClick = () => {
        const newPrizeNumber = Math.floor(Math.random() * data.length)
        setPrizeNumber(newPrizeNumber)
        setMustSpin(true)
    }
    const data = [
        { option: '1', style: { backgroundColor: '#F8B62B', textColor: 'black' } },
        { option: '2', style: { backgroundColor: '#EEEEEE' } },
        { option: '3', style: { backgroundColor: '#F8B62B', textColor: 'black' }  },
        { option: '4', style: { backgroundColor: '#EEEEEE' } },
        { option: '5', style: { backgroundColor: '#F8B62B', textColor: 'black' }  },
        { option: '6', style: { backgroundColor: '#EEEEEE' } },
    ]


    const row = 6;
    const column = 6;
    // 0~35까지 만들기
    const fields = Array.from(Array(row * column).keys()).map((v) => v);
    const [players, setPlayers] = useState([ //임시 플레이어 목록
        {name: '지성', location: 0},
        {name: '정민', location: 10},
        {name: '종휘', location: 13},
        {name: '성원', location: 2},
        {name: '재혁', location: 0},
        {name: '호준', location: 0}
    ]);

    const [abc, setABC] = useState(0)
    const [prevAbc, setPrevABC] = useState(null)

    function getTurn() {
        const turn = Math.floor(Math.random() * 6); // 0~5
        setPrevABC(abc);
        setABC(turn);
    }


    // const rotation = keyframes`
    // from {
    //   transform: rotate(0deg);
    // }
    // to {
    //   transform: rotate(7045deg);
    // }

    //`

    // const StyledWrapper = styled.div`
    //   width: 100px;
    //   height: 100px;
    //   background: #00bfb2;
    //   ${(props) => props.active &&`
    //    animation: ${rotation} 7s ease-in-out forwards;
    //   `}
    //`
    // const Box = ({children, ...rest}) => {
    //     return (
    //         <StyledWrapper {...rest}>
    //             {children}
    //         </StyledWrapper>
    //     );
    // };

    return (
        <div className={'AlcoholMarbleBody'}>
            <div className={'AlcoholMarbleMain'}>
                <div style={styles.fields}>
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
                <button id="trigger" style={styles.goBtn} onClick={handleSpinClick}>GO!</button>
                {/*<img src={WheelImg} style={{...getRotateDeg(abc, prevAbc), ...styles.wheelAnimate}}/>*/}
                <div style={styles.circle}>
                    <Wheel
                        mustStartSpinning={mustSpin}
                        prizeNumber={prizeNumber}
                        data={data}
                        fontSize={40}
                        perpendicularText={true}
                        onStopSpinning={() => {
                            setMustSpin(false)
                            console.log(data[prizeNumber].option)
                        }}
                    />
                </div>


            </div>
            {/*<div>*/}
            {/*{StyledWrapper}*/}
            {/*</div>*/}
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
        width: '80px',
        height: '80px',
    },
    players: {
        display: 'grid',
        width: '10px',
        height: '5px',
        gridRowGap: '5px',
    },
    player: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        color: 'white'
    },

    roulette: {
        width: '220px',
        height: '220px',
        position: 'absolute',
        marginLeft: '-110px',
        marginTop: '-160px',
        left: '50%',
        top: '50%',
    },
    wheelAnimate: {
        transition: '1000ms',
        width: '220px',
        height: '220px'
    },
    rotate: [

        {transform: 'rotate(330deg)'},
        {transform: 'rotate(270deg)'},
        {transform: 'rotate(210deg)'},
        {transform: 'rotate(150deg)'},
        {transform: 'rotate(90deg)'},
        {transform: 'rotate(30deg)'},
    ],
    goBtn: {
        position: 'absolute',
        zIndex: 100,
        width: 80,
        height: 80,
        fontSize: 30, cursor: 'pointer',
        borderRadius: '50%',
        border: '6px solid #287F39',
        backgroundColor: '#FFF',
        top:'50%', left: '50%', transform: 'translate(-50%,-50%)',
    },
    circle: {
        position: 'absolute',
        transform: 'scale(0.6)',
        top: '-50%',
        left: '-50%',
    },
};
