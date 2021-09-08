import React from 'react'

const LoseLiarComponent = (props) => {
    return (
        <>
            <div style={styles.title}>라이어 패배 !</div>
            <img style={styles.imgStyle} src={props.profile} alt=""/>
            <div style={styles.userName}>{props.name}</div>
            <div style={styles.btnContainer}>
                <input style={styles.startBtn} type="button" value="다시하기"/>
                <input style={styles.stopBtn} type="button" value="끝내기"/>
            </div>
        </>
    )
}

export default LoseLiarComponent

const styles = {
    title: {
        marginTop: 60,
        fontSize: 120,
        color: '#FCCE39',
        textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
    },
    imgStyle: {
        width: 355, height: 357,
    },
    userName: {
        fontSize: 40,
    },
    btnContainer: {
        marginTop: 49,
    },
    startBtn: {
        width: 146, height: 43, backgroundColor: '#08552E', color: '#FCCE39', border: 'none', marginRight: 115,
        fontSize: 20, cursor: 'pointer',
    },
    stopBtn: {
        width: 146, height: 43, backgroundColor: '#21AB66', color: '#FCCE39', border: 'none', fontSize: 20,
        cursor: 'pointer',
    },

}
