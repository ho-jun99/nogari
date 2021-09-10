import React, {useEffect, useState} from "react";
import './AlcoholFieldGrid.css';
import Finish from '../../images/finish.png';
import {Wheel} from 'react-custom-roulette'
import {getGameData, getGameRoomData} from "../../firebase/game-data";
import '../../firebase/firebase-manager';
import firebase from "../../firebase/firebase-manager";

const db = firebase.firestore();
const roomId = localStorage.getItem('roomNumber');

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

// 안쓰는 함수
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


export function AlcoholFieldGrid({match}) {
    const [players, setPlayers] = useState([ //임시 플레이어 목록
        // {name: '지성', location: 0, order: true},
        // {name: '정민', location: 0, order: false},
        // {name: '종휘', location: 0, order: false},
        // {name: '성원', location: 0, order: false},
        // {name: '재혁', location: 0, order: false},
        // {name: '호준', location: 0, order: false}
    ]);

    // 유저 위치를 갱신하는 함수
    // 돌림판 돌린 유저 이름과 해당 유저의 최신 위치를 인자로 받아 파이어스토어에 갱신한다.
    const setUserLocation = async (userName, location) => {

        // 필드 데이터 받아오는 부분
        const gameData = await db.collection('game').doc(roomId).get().then((doc) => {
            return doc.data()
        });
        // console.log(gameData);

        // 해당 유저의 위치를 최신화 하여 파이어스토어에 저장하는 부분
        await db.collection("game").doc(roomId).update({
            ...gameData,
            liar: {
                ...gameData.liar,
            },
            players: {
                ...gameData.players,
                [userName]: { // [userName] 이와 같이 해야 key 값이 파라미터에서 넘어온 대로 저장. userName: 으로 하면 키 값이 userName 스트링 자체로 바뀜
                    ...gameData.players[userName],
                    alcoholRoulette: {
                        ...gameData.players[userName].alcoholRoulette,
                        location: location // value는 파라미터 넘어온 그대로 사용 가능
                    },
                    liar: {
                        ...gameData.players[userName].liar,
                    },
                    wordGame: {
                        ...gameData.players[userName].wordGame,
                    }
                }
            }
        });
    }

    // 파이어스토어에서 유저 정보를 받아와 유저 리스트에 저장 => 그러면 화면에 뿌려짐
    const initializeUser = async (userData) => {
        let temp_list = []
        let values = Object.values(userData.players); // players 하위 데이터를 가져옴

        let userName = Object.keys(userData.players)[0]; // ex) 원성임
        let userLocation = values[0].alcoholRoulette.location; // 0~19 사이
        let userOrder = values[0].alcoholRoulette.order; // true or false

        temp_list.push({name: userName, location: userLocation, order: userOrder});
        temp_list[0].order = true; // 리스트의 첫번째 유저 순서를 true로 변경
        await setPlayers(temp_list);

        // 위 코드는 유저가 1명인 가정 하에 구현한 코드, 여러 인원인 경우엔 for문으로 돌아서 저장하면 될 듯 싶다.
    }

    // doc() 안의 인자는 동적으로 주어야 할 것 같은데 roomId 가져오는 방법을 모르겠음
    // 해당 방의 필드 정보들을 가져와서 initializeUser 함수에 넘겨줌
    useEffect(async () => {
        let docRef = db.collection("game").doc(roomId); // roomId

        await docRef.get().then((doc) => {
            if (doc.exists) {
                let resultData = doc.data();
                initializeUser(resultData);
            } else {
                console.log("No such document data");
            }
        })
            .catch((error) => {
                console.log("Error getting document..", error);
            });
    }, []);


    // 라이브러리 이용한 룰렛 구현
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);

    const handleSpinClick = () => {
        const newPrizeNumber = Math.floor(Math.random() * data.length)
        setPrizeNumber(newPrizeNumber)
        setMustSpin(true)
    }
    const data = [
        {option: '1', style: {backgroundColor: '#F8B62B'}},
        {option: '2', style: {backgroundColor: '#EEEEEE'}},
        {option: '3', style: {backgroundColor: '#F8B62B'}},
        {option: '4', style: {backgroundColor: '#EEEEEE'}},
        {option: '5', style: {backgroundColor: '#F8B62B'}},
        {option: '6', style: {backgroundColor: '#EEEEEE'}},
    ]
    // 여기까지 //

    const row = 6;
    const column = 6;
    // 0~35까지 만들기
    const fields = Array.from(Array(row * column).keys()).map((v) => v);


    // 쓰이고 있지 않은 코드들
    const [orderUser, setOrderUser] = useState("");

    const [abc, setABC] = useState(0)
    const [prevAbc, setPrevABC] = useState(null)

    function getTurn() {
        const turn = Math.floor(Math.random() * 6); // 0~5
        setPrevABC(abc);
        setABC(turn);
    }

    //////////////////////


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
                <div style={styles.orderUser}>‘{orderUser}’ 님 차례입니다!</div>
                <button id="trigger" style={styles.goBtn} onClick={handleSpinClick}>GO!</button>
                <img src={Finish} alt="" style={styles.finishImg}/>
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
                            let temp_user_list = [...players];
                            for (let i = 0; i < temp_user_list.length; i++) {
                                if (temp_user_list[i].order === true) {
                                    temp_user_list[i].location = (temp_user_list[i].location + parseInt(data[prizeNumber].option)) % 20;
                                    setUserLocation(temp_user_list[i].name, temp_user_list[i].location); // 돌림판 돌린 사용자의 이름, 나온 위치를 해당 함수의 인자로 넘김
                                    temp_user_list[i].order = false;
                                }
                            }
                            setPlayers(temp_user_list);
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
        top: '60%', left: '50%', transform: 'translate(-49%,-50%)',
    },
    circle: {
        position: 'absolute',
        transform: 'scale(0.5)',
        top: '-40%',
        left: '-50%',
    },
    orderUser: {
        width: 424,
        height: 70,
        backgroundColor: '#0C8247',
        color: '#FCCE39',
        fontSize: 26,
        textAlign: 'center',
        lineHeight: 2.9,
        borderRadius: 15,
        zIndex: 1,
        position: 'absolute',
        top: '-30%',
        left: '-47%',
    },
    finishImg: {
        position: 'absolute', right: '-18%', bottom: '-18%',
    },
};
