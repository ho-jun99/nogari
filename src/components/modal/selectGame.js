import React, {useState} from 'react'

const gameList = [
    {
        id: 0,
        gameName: "주루마블",
        description: "주사위를 굴리고 술을 마시는 게임",
    },
    {
        id: 1,
        gameName: "라이어게임",
        description: "거짓말을 하고 있는 사람을 찾아내는 게임",
    },
    {
        id: 2,
        gameName: "벌칙룰렛",
        description: "룰렛 돌려서 벌칙을 수행하는 게임",
    },
    {
        id: 3,
        gameName: "초성게임",
        description: "초성을 보고 맞추는 게임",
    },

]

const SelectGame = (props) => {

    // 게임 선택 '나가기' 버튼 클릭 시 팝업창 종료 및 '선택하기' 버튼 비활성화
    const exitMenu = () => {
        props.close();
        setIsSelected(false);
        setSelectedGame("");
    }
    const [isSelected, setIsSelected] = useState(false); // 게임 선택 유무
    const [selectedGame, setSelectedGame] = useState(""); // 선택된 게임 이름

    const game_info = gameList.map((idx) => (
        <li style={styles.listStyle} onClick={() => {
            for (let i=0; i<gameList.length; i++) {
                if (gameList[i].id === idx.id) {
                    setSelectedGame(gameList[i].gameName);
                    setIsSelected(true);
                }
            }
        }}>
            <span>{idx.gameName}</span>
        </li>
    ))

    const sendToParent = () => {
        for (let i=0; i<gameList.length; i++) {
            if (gameList[i].gameName === selectedGame) {
                props.parentFunction(gameList[i]);
            }
        }
        props.close();
    }

    return (
        <>
            {props.open ? (
                <div style={styles.container}>
                    <h2 style={styles.title}>게임 선택</h2>
                    <div style={styles.listContainer}>{game_info}</div>
                    <div style={styles.btnContainer}>
                        {isSelected ? <button style={styles.btnStyle} onClick={sendToParent}>선택하기</button> :
                            <button style={styles.btnStyle} disabled>선택하기</button>}
                        <button style={styles.btnStyle} onClick={exitMenu}>나가기</button>
                        <span>선택된 게임 : {selectedGame}</span>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default SelectGame

const styles = {
    container: {
        width: 768, height: 576, border: '1px solid black', backgroundColor: '#eee'
    },
    title: {
        textAlign: 'center',
    },
    listStyle: {
        listStyleType: 'none',
        display: 'inline-block',
        border: '1px solid black',
        borderRadius: 5,
        width: '45%',
        boxSizing: 'border-box',
        height: 180,
        padding: 10,
        cursor: 'pointer',
    },
    listContainer: {
        width: '100%', textAlign: 'center',
    },
    btnContainer: {
        width: '100%', textAlign: 'center', marginTop: 50,
    },
    btnStyle: {
        width: 120, height: 40, margin: '0 30px 0 30px',
    }
}
