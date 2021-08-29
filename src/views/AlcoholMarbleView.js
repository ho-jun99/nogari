import React, {useState} from 'react';
import {AlcoholFieldGrid} from "../components/AlcoholFieldGrid";
import { Wheel } from 'react-custom-roulette'
import AlcoholMarblePlayer from "../components/AlcoholMarblePlayer";

import MarbleField from '../images/marbleField.png';
import MarbleBG from '../images/background.png'




export default function AlcoholMarbleView() {
    const user = {
        name : "임성원",
        location: 0,
    }

    const startGame = () => {
        const dice_number = Math.floor(Math.random()*6)+1
        alert("사용자 : " + user.name + "\n주사위 숫자 : " + dice_number.toString());
        user.location += dice_number
        alert("사용자 위치 : " + user.location%20);
    }


    return (
        <>
            <div style={styles.marbleBg}>
                <div style={styles.rouletteBgParent}>
                    <div style={styles.rouletteBg}>
                        <AlcoholFieldGrid/>
                    </div>
                </div>
            </div>

        </>
    );
}



const styles = {
    marbleBg: {
        width: '100%',
        height: '100vh',
        backgroundImage: `url(${MarbleBG})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
    },

    rouletteBgParent: {
        height: '100vh',
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    rouletteBg:{
        backgroundImage: `url(${MarbleField})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        width: '822px',
        height: '740px',
        position:'relative'

        // position:'absolute',
        // left:'50%',
        // top:'50%',
        // marginLeft: '-411px',
        // marginTop: '-370px',
    }
};


