import React from 'react'

export default function GoStopModal(props) {

    // SpeakComponent에 발언 재개 여부를 반환
    const sendToSpeakComponent = () => {
        props.goStopResult(true);
        close();
    }

    const {open, close, userList} = props;
    return (
        <div>
            {open ? (
                <div style={styles.container}>
                    <div style={styles.title1}>게임을 더 진행할지 멈추고 라이어를 지목할지 선택해주세요!</div>
                    <div style={styles.title2}>동점일 시 투표가 무효됩니다.</div>
                    <div style={styles.timer}>30초</div>
                    <ul style={styles.listContainer}>
                        <li style={styles.listStyle}>
                            <div style={styles.circle}>GO</div>
                            <span style={styles.userName}>이름</span></li>
                        <li style={styles.listStyle}>
                            <div style={styles.circle}>GO</div>
                            <span style={styles.userName}>이름</span></li>
                        <li style={styles.listStyle}>
                            <div style={styles.circle}>GO</div>
                            <span style={styles.userName}>이름</span></li>
                        <li style={styles.listStyle}>
                            <div style={styles.circle}>X</div>
                            <span style={styles.userName}>이름</span></li>
                        <li style={styles.listStyle}>
                            <div style={styles.circle}>X</div>
                            <span style={styles.userName}>이름</span></li>
                        <li style={styles.listStyle}>
                            <div style={styles.circle}>X</div>
                            <span style={styles.userName}>이름</span></li>
                    </ul>

                    <button style={styles.goStopBtn}>GO</button>
                    <button style={styles.goStopBtn} onClick={sendToSpeakComponent}>STOP</button>
                </div>
            ) : null}
        </div>
    )
}

const styles = {
    container: {
        position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        width: 730, height: 526, backgroundColor: '#7a7a7a', opacity: 0.8, top: '18%',
    },
    title1: {
        color: '#fff', fontStyle: 'Roboto', fontWeight: 'medium', fontSize: 22, marginTop: 54,
    },
    title2: {
        color: '#fff', fontStyle: 'Roboto', fontWeight: 'medium', fontSize: 22,
    },
    timer: {
        color: '#fff', fontStyle: 'Roboto', fontWeight: 'bold', fontSize: 32, marginTop: 62,
    },
    listContainer: {
        marginTop: 50,
        marginBottom: 46.28,
    },
    listStyle: {
        listStyleType: 'none', display: 'inline-block',
        width: 80, height: 120, marginRight: 10,
    },
    circle: {
        width: 50, height: 50, borderRadius: '50%', backgroundColor: '#c4c4c4', textAlign: 'center', lineHeight: 3,
        marginLeft: 15, marginTop: 10, marginBottom: 23,
    },
    userName: {
        color: '#fff', fontWeight: 'bold',
    },
    goStopBtn: {
        width: 264, height: 46,
    },
}
