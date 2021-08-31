import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router";
import {getWordGameCategory} from "../firebase/games/word-game";
import {getWord} from "../firebase/games/liar";
import Category from "../components/common/Category";
import './WordGameCategoryView.css'

export default function WordGameCategoryView({ match } ) {
    const [isChoice, setIsChoice] = useState(false);

    const history = useHistory();
    const roomId = match.params.roomId;

    const WordGameCategoryChoice = () => {
        history.push(`/rooms/${roomId}/word`);
    }
    return (
        <>
            <div id='WordGameCategoryContainer'>
                <p id='WordGameCategoryHeader'>중간고사 서바이벌!</p>
                <Category
                    setIsChoice = {setIsChoice}
                    roomId={roomId}
                />
                {isChoice ? <button id='WordGameCategoryChoice_after' onClick={() => WordGameCategoryChoice()}>선택하기</button> :<button id='WordGameCategoryChoice_before'>선택하기</button> }
            </div>

        </>
    )
}
