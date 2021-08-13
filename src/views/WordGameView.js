import React from 'react';
import {useState} from "react";

export default function WordGameView() {
    const wordData = [
        {
            quiz: 'ㅌㅊ',
            answer: '탈출',
        },
        {
            quiz: 'ㄱㅊ',
            answer: '김치',
        },
        {
            quiz: 'ㅇㄴㅇ',
            answer: '윷놀이',
        },
        {
            quiz: 'ㅎㄱ',
            answer: '한글',
        },
    ];
    const [gameIndex, setGameIndex] = useState(0);
    const [answer, setAnswer] = useState('');

    const handleSearch = () => {
        if (answer && answer === wordData[gameIndex].answer) {
            alert('정답');
            setGameIndex(Math.floor(Math.random() * wordData.length));
            setAnswer('');
        } else {
            alert('다시 시도');
        }
    };

    return (
        <>
            <div>
                초성 게임 메인 페이지
                <div className="quizBox">
                    <label>{wordData[gameIndex].quiz}</label>
                </div>
                <div className="inputBox">
                    <input type="text" value={answer} onChange={e=>setAnswer(e.target.value)} />
                    <button type="button" onClick={handleSearch}>
                        확인
                    </button>
                </div>

            </div>
        </>
    );
}
