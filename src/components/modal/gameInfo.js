import React, {useState, useEffect} from 'react';

function GameInfo(props) {
    let {open, close, gameInfo} = props;

    return (
        <div style={styles.container}>
            {open ? (
                <div style={styles.innerContainer}>
                    <div style={styles.title}>{gameInfo.gameName}</div>
                    <div style={styles.content}>{gameInfo.description}</div>
                    <h2>규칙</h2>
                    <div style={styles.content}>{gameInfo.story}</div>
                    <button onClick={close} style={styles.btn}>확인</button>
                </div>
            ) : null}
        </div>
    )
}

export default GameInfo

const styles = {
    container: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',
        zIndex: 999,
    },
    innerContainer: {
        position: 'relative',
        width: 480,
        height: 520,
        border: '1px solid black',
        backgroundColor: '#bbbbbb',
        color: '#111',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    title: {fontSize: 28, marginBottom: 12,},
    btn: {width: 120, height: 30, position: 'absolute', bottom: 22, transform: 'translateX(-50%)', fontWeight: 'bold', fontSize: 18,},
}
