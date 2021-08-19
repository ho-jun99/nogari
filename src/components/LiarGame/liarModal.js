import React from 'react'

export default function LiarModal(props) {
    const {open, close} = props;
    return (
        <div>
            {open ? (
                <div style={styles.container}>
                    <div style={styles.headerTitle}>당신은</div>
                    <div style={styles.title}>라이어</div>
                    <div style={styles.content}>정체를 숨기고 제시어를 알아내세요!</div>
                    <span style={styles.description}>다른 플레이어들이 제시어를 확인할 때까지 잠시 기다려주세요.</span>
                </div>
            ) : null}
        </div>
    )
}
const styles = {
    container: {
        width: 470,
        height: 305,
        top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        position: 'absolute',
        textAlign: 'center', backgroundColor: '#7a7a7a',
    },
    headerTitle: {
      marginTop: '10%', marginBottom: '2%', color: '#fff',
    },
    title: {
        color: '#fff',
        fontSize: 48, fontWeight: 'bold', marginBottom: 14,
    },
    content: {
        color: '#fff',
        fontSize: 18, fontWeight: 'normal', marginBottom: 64,
    },
    btn: {
        width: 112,
        height: 40,
        color: '#8f8f8f', fontSize: 18,
    },
    description: {
        color:'#fff',
    }
}
