import React, {useState} from 'react'
import GameInfo from "./gameInfo";
import '../css/selectGame.css'


// const gameList = []

const SelectGame = (props) => {

    const [gameList, setGameList] = useState([
        {
            id: 0,
            gameName: "주루마블",
            description: "주사위를 굴리고 술을 마시는 게임..(스토리 생략)",
            story: "주루마블 규칙..(생략)",
        },
        {
            id: 1,
            gameName: "라이어게임",
            description: "거짓말을 하고 있는 사람을 찾아내는 게임..(스토리 생략)",
            story: "라이어게임 규칙..(생략)",
        },
        {
            id: 2,
            gameName: "벌칙룰렛",
            description: "룰렛 돌려서 벌칙을 수행하는 게임..(스토리 생략)",
            story: "벌칙룰렛 규칙..(생략)",
        },
        {
            id: 3,
            gameName: "초성게임",
            description: "초성을 보고 맞추는 게임..(스토리 생략)",
            story: "초성게임 규칙..(생략)",
        },
    ]);

    const [infoModal, setInfoModal] = useState(false);
    const [gameInfo, setGameInfo] = useState({});
    const infoOpenModal = () => {
        setInfoModal(true);

    }
    const infoCloseModal = () => {
        setInfoModal(false);
    }

    // 게임 선택 '나가기' 버튼 클릭 시 팝업창 종료 및 '선택하기' 버튼 비활성화
    // const exitMenu = () => {
    //     props.close();
    //     setIsSelected(false);
    //     setSelectedGame("");
    // }
    const [isSelected, setIsSelected] = useState(false); // 게임 선택 유무
    const [selectedGame, setSelectedGame] = useState(""); // 선택된 게임 이름

    const game_info = gameList.map((idx, index) => (
        <li className="gameList" key={index} onClick={() => {
            for (let i = 0; i < gameList.length; i++) {
                if (gameList[i].id === idx.id) {
                    setSelectedGame(gameList[i].gameName);
                    setGameInfo(gameList[i]);
                    setIsSelected(true);
                }
            }
        }}>
            <div style={styles.contentContainer}>
                <div className="infoBtn" style={styles.infoIcon} onClick={infoOpenModal}>i</div>
                <div style={styles.gameName}>{idx.gameName}</div>
            </div>
        </li>
    ));

    const sendToParent = () => {
        props.parentFunction(gameList.find((i) => i.gameName === selectedGame));
        props.close();
    }

    return (
        <div style={styles.container}>
            {props.open ? (
                <div style={styles.innerContainer}>
                    <h2 style={styles.title}>게임 선택</h2>
                    <div style={styles.listContainer}>{game_info}</div>
                    <div style={styles.btnContainer}>
                        {isSelected ? <button style={styles.btnStyleSelected} onClick={sendToParent}>선택 완료</button> :
                            <button style={styles.btnStyle} disabled>선택 완료</button>}
                        {/*<span>선택된 게임 : {selectedGame}</span>*/}
                    </div>
                </div>
            ) : null}
            <GameInfo open={infoModal} close={infoCloseModal} gameInfo={gameInfo}/>
        </div>
    );
}

export default SelectGame

const styles = {
    container: {
      position: 'absolute',
        left: '50%',
        top: '7%',
        transform: 'translateX(-50%)',
    },
    innerContainer: {
        width: 850, height: 700, border: '2px solid #FCCE39', backgroundColor: '#1B9659', color: '#FCCE39',
        borderRadius: 15,
    },
    title: {
        textAlign: 'center', fontSize: 40,
    },
    listContainer: {
        textAlign: 'center', backgroundColor: '#08552E', borderRadius: 10, border: '1px solid black',
        margin: '0 20px 0 20px',
    },
    btnContainer: {
        width: '100%', textAlign: 'center', marginTop: 30,
    },
    btnStyle: {
        width: 220, height: 35, backgroundColor: '#DDDDDD', border: 'none', color: '#FFF', fontSize: 18,
        borderRadius: 10,
    },
    btnStyleSelected: {
        width: 220, height: 35, backgroundColor: '#FCCE39', border: 'none', color: '#1B9659', fontSize: 18,
        borderRadius: 10, cursor: 'pointer',
    },
    contentContainer: {
      position: 'relative'
    },
    infoIcon: {
        position: 'absolute', display: 'block', width: 20, height: 20, lineHeight: '22px',
        borderRadius: 100, right: 0, zIndex: 99, top:-92,
    },
    gameName: {
      marginTop: 94,
    },
}
