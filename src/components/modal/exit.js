import React from 'react';

function Exit(props) {
    const {open, close} = props;
    return (
        <div style={styles.container}>
            {open ? (
                <div style={styles.innerContainer}>
                    <span style={styles.title}>다른방 찾기</span>
                    <span style={styles.content}>다른방을 찾으러 나가시겠습니까?</span>
                    <div style={styles.btnContainer}>
                        <button style={styles.btn}>나갈래</button>
                        <button onClick={close} style={styles.btn}>취소</button>
                    </div>

                </div>
            ) : null}
        </div>
    )
}

export default Exit

const styles = {
    container: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',
        zIndex: 999,

    },
    innerContainer: {
        position: 'relative', width: 440, height: 220, border: '3px solid black', backgroundColor: '#eee',
    },
    title: {
        display: 'block', textAlign: 'center', fontWeight: 'bold', position: 'absolute', width: '100%', top: 30,
    },
    content: {
        display: 'block', textAlign: 'center', fontWeight: 'bold', position: 'absolute', width: '100%', top: '40%'
    },
    btnContainer: {
        position: 'absolute', textAlign: 'center', width: '100%', bottom: 10,
    },
    btn: {
        backgroundColor: '#908f8f', width:100, color: '#fff', margin: '0 10px 0 10px',
    },
}
