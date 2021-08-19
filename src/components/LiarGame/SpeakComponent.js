import React, {useState} from 'react'
import ana from '../../views/img/Ana.png'
import GoStopModal from "./goStopModal";

export default function SpeakComponent(props) {
    const gameUser = [
        {
            nickname: "성원이다", // 닉네임
            isLiar: false, // true 이면 해당 유저는 라이어
            order: true, // true 이면 본인 순서
        },
    ]
    const [count, setCount] = useState(20);

    setTimeout(() => {
        setCount(count - 1);
    }, 1000);

    const userList = gameUser.map((user) => {
        return (
                <li style={styles.listStyle}>
                    <img src={ana} alt="아나" style={user.order ? styles.startUser : styles.stopUser}/>
                    <div>{user.nickname}</div>
                </li>

        )
    });


    const [voteModal, setVoteModal] = useState(false);
    const openVoteModal = () => {
        setVoteModal(true);
    }
    const closeVoteModal = () => {
        setVoteModal(false);
    }

    // goStopModal 으로 부터 받아온 데이터, 게임 진행 여부를 받았고, 다시 LiarGameView에 해당 결과를 반환
    const getFromVoteModal = (data) => {
        props.goStopResult(data);
    }


    return (
        <div style={styles.container}>
            <div style={styles.title}>‘{gameUser[0].nickname}’님 차례입니다!</div>
            <div style={styles.description}>제시어와 관련된 발언을 한 후, ‘발언 종료’버튼을 눌러주세요.<br/>
                제한시간이 지나면 자동으로 다음 순서로 넘어갑니다.
            </div>
            <span style={styles.count}>{count}</span>
            <button style={styles.stopBtn} onClick={openVoteModal}>발언 종료</button>
            <div>
                {userList}
            </div>
            <GoStopModal open={voteModal} close={closeVoteModal} userList={gameUser} goStopResult={getFromVoteModal}/>
        </div>
    )
}

const styles = {
    container: {
        textAlign: 'center',
    },
    title: {
        color: '#535353', fontStyle: 'Roboto', fontWeight: 'black',
        fontSize: 36, marginBottom: 24, marginTop: 137,
    },
    description: {
        color: '#535353', fontSize: 24, marginBottom: 68,
    },
    count: {
        fontSize: 55, fontStyle: 'Roboto',
        fontWeight: 'bold', display: 'block',
    },
    stopBtn: {
        marginTop: 52, width: 238, height: 62, backgroundColor: '#7a7a7a', color: '#fff',
        fontStyle: 'Roboto', fontWeight: 'bold', fontSize: 25,

    },
    startUser: {
        width: 100, height: 100, border: '1px solid red',
    },
    stopUser: {
        width: 100, height: 100,
    },
    listStyle: {
        listStyleType: 'none', display: 'inline-block', border: '1px solid black', borderRadius: 5,
        width: 120, boxSizing: 'border-box', height: 160, padding: 10, margin: '28px 8px 0 0',
    },

}
