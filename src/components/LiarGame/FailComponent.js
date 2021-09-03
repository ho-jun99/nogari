import React from 'react'
import Circle from "./images/redCircle.png";

const FailComponent = (props) => {
    return(
        <>
            <div style={styles.container}>
                <div style={styles.title}>라이어 지목 실패!</div>
                <div style={styles.innerContainer}>
                    <img style={styles.imgStyle} src={props.profile} alt=""/>
                    <div style={styles.nameStyle}>{props.name}</div>
                </div>
                <img src={Circle} style={styles.circle} alt="redcircle"/>
            </div>
        </>
    )
}

export default FailComponent

const styles = {
    container: {
        position: 'relative',
    },
    imgStyle: {
        width: 340,
        height: 386,
    },
    nameStyle: {
        color: '#FCCE39',
        fontSize: 36,
    },
    title: {
        fontSize: 32, color: '#FFF',
        marginTop: 86,
    },
    innerContainer: {
        position: 'absolute',
        width: 328,
        height: 497,
        backgroundColor: '#032213',
        left: '50%', transform: 'translateX(-50%)',
        marginTop: 86,
        borderRadius: 15,
    },
    circle: {
        position: 'absolute', top: -90, left: '50%', zIndex: -1, transform: 'translateX(-50%)',
        width: 850, height: 850,
    },
}
