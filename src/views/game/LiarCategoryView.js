import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router";
import {getWordGameCategory} from "../../firebase/games/word-game";
import {getWord} from "../../firebase/games/liar";
import Category from "../../components/common/Category";
import './css/LiarCategoryView.css'
import {getGameData, setLiarPlayerData} from "../../firebase/game-data";
import {getNickname, setUser} from "../../firebase/SetUser";

export default function LiarCategoryView({ match } ) {
    const [isChoice, setIsChoice] = useState(false);
    const [userCount, setUserCount] = useState(0);
    const [userNickname, setUserNickname] = useState([]);
    const [category, setCategory] = useState('');
    const history = useHistory();
    const roomId = match.params.roomId;


    const init = async () => {
        const users = await getGameData(roomId);
        setCategory(users.liar.liarword);
        const userLength = Object.entries(users.players).length;
        setUserCount(userLength);
        setUserNickname(users.turn);
    }
    init();

    console.log(userNickname);

    const LiarCategoryChoice = () => {
        const random = Math.floor(Math.random()*userCount);
        if(category) history.push(`/rooms/${roomId}/liar`);
        setLiarPlayerData(roomId, userNickname[random], 'isliar', true);
    }
    return (
        <>
            <div id='LiarCategoryContainer'>
                <p id='LiarCategoryHeader'>안주 라이어</p>
                <Category
                    setIsChoice = {setIsChoice}
                    roomId={roomId}
                />
                {isChoice ? <button id='LiarCategoryChoice_after' onClick={() => LiarCategoryChoice()}>선택완료</button> :<button id='LiarCategoryChoice_before'>선택완료</button> }
            </div>

        </>
    )
}