import React from 'react';
import AlcoholMarbleField from "../components/AlcoholMarbleField";
import AlcoholField from "../components/AlcoholField";
import AlcoholPlayer from "../components/AlcoholPlayer";
import AlcoholRoulette from "../components/AlcoholRoulette";
import {AlcoholFieldGrid} from "../components/AlcoholFieldGrid";

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
            <div>
                주루마블 메인 페이지
                <input type="button" onClick={startGame} value="주사위 굴리기"/>
                {/*<AlcoholField/>*/}

                <AlcoholFieldGrid/>
            </div>
        </>
    );
}
