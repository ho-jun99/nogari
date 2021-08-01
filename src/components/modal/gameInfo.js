import React, {useState, useEffect} from 'react';

function GameInfo(props) {
    const {open, close, gameInfo} = props;

    return (
        <>
            {open ? (
                <div style={styles.container}>
                    <div style={styles.title}>{gameInfo.gameName}</div>
                    <div style={styles.content}>{gameInfo.description}</div>
                    <h2>규칙</h2>
                    <div style={styles.content}>{gameInfo.story}</div>
                    <button onClick={close} style={styles.btn}>확인</button>
                </div>
            ) : null}
        </>
    )
}

export default GameInfo

const styles = {
    container: {
        position: 'relative',
        width: 576,
        height: 768,
        border: '1px solid black',
        backgroundColor: '#bbbbbb',
        color: '#111',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    title: {fontSize: 28, marginBottom: 12,},
    btn: {width: 120, height: 30, position: 'absolute', bottom: 22, transform: 'translateX(-50%)', fontWeight: 'bold', fontSize: 18,},
}
