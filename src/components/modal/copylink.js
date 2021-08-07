import React from 'react';

function CopyLink(props) {
    const {open, close} = props;
    return (
        <div style={styles.container}>
            {open ? (
                <div style={styles.innerContainer}>
                    <span style={styles.title}>링크로 초대하기</span>
                    <span style={styles.content}>링크가 복사되었습니다.같이 할 친구에게 보내 게임에 초대하세요!</span>
                    <div style={styles.btnContainer}>
                        <button onClick={close} style={styles.btn}>확인</button>
                    </div>

                </div>
            ) : null}
        </div>
    )
}

export default CopyLink

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
