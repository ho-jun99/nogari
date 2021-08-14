import React, {useEffect, useState} from 'react';
import {getWordGameCategory} from "../firebase/games/word-game";
import './WordGameView.css';

export default function WordGameView() {
    const [categoryData, setCategoryData] = useState({});
    const [categories, setCategories] = useState([]);
    const [wordGame, setWordGame] = useState([]);

    useEffect(() => {
        const init = async () => {
            const gameData = await getWordGameCategory();
            const test = Object.entries(gameData);
            console.log(test);
            const category = test.map(([category, list]) => category);
            console.log(category);
            setCategories(category);
            setCategoryData(gameData);
        };
        init();
    }, []);

    const getCategoryData = async (categoryName) => {
        setWordGame([]);
        console.log(categoryData[categoryName]);
        console.log(Object.entries(categoryData[categoryName]));
        await Object.entries(categoryData[categoryName]).map((data) => setWordGame(wordGame => [...wordGame, {
            quiz: data[0],
            answer: data[1]
        }]));
        await getQuiz()
    };

    const getQuiz = () => {
        const length = wordGame.length;
        console.log(length);
        setGameIndex(Math.floor(Math.random() * length));
    }
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
    console.log(wordGame);
    return (
        <>
            <div className="wordGameContainer">
                초성 게임 메인 페이지
                {categories.map((cate, index) => <button onClick={() => getCategoryData(cate)}
                                                         key={index}>{cate}</button>)}
                <div className="quizBox">
                    <label>{wordData[gameIndex].quiz}</label>
                </div>
                <div className="inputBox">
                    <input type="text" value={answer} onChange={e => setAnswer(e.target.value)}/>
                    <button type="button" onClick={handleSearch}>
                        확인
                    </button>
                </div>

            </div>
        </>
    );
}
