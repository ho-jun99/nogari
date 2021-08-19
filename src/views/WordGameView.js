import React, {useEffect, useState} from 'react';
import {getWordGameCategory} from "../firebase/games/word-game";
import './WordGameView.css';
import WordGamePlayer from "../components/WordGamePlayer";

export default function WordGameView() {
    const [user, setUser] = useState([
        {
            name: '박정민',
            isCorrected: true,
        },
        {
            name: '정나영',
            isCorrected: true,
        },
        {
            name: '김지성',
            isCorrected: false,
        },
    ])
    const [categoryData, setCategoryData] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [wordGame, setWordGame] = useState([
        {
            quiz:'',
            answer:'',
        }
    ]);
    const [seconds, setSeconds] = useState(30);

    useEffect(() => {
        const countdown = setInterval(() => {
            if (parseInt(seconds) > 0) {
                setSeconds(parseInt(seconds) - 1);
            } else {
                getQuiz();
                setSeconds(30);
            }
        }, 1000);
        return () => clearInterval(countdown);
    }, [seconds]);

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
        setSelectedCategory(categoryName);
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
        setGameIndex(Math.floor(Math.random() * length));
    }

    // const wordData = [
    //     {
    //         quiz: 'ㅌㅊ',
    //         answer: '탈출',
    //     },
    //     {
    //         quiz: 'ㄱㅊ',
    //         answer: '김치',
    //     },
    //     {
    //         quiz: 'ㅇㄴㅇ',
    //         answer: '윷놀이',
    //     },
    //     {
    //         quiz: 'ㅎㄱ',
    //         answer: '한글',
    //     },
    // ];

    const [gameIndex, setGameIndex] = useState(0);
    const [answer, setAnswer] = useState('');


    const handleSearch = () => {
        if (answer && answer === wordGame[gameIndex].answer) {
            alert('정답');
            setGameIndex(Math.floor(Math.random() * wordGame.length));
            setAnswer('');
            setSeconds(30);
        } else {
            alert('다시 시도');
        }
    };

    return (
        <>
            <div className="wordGameContainer">
                초성 게임 메인 페이지
                <div>
                    <h2>
                        {seconds < 10 ? `0${seconds}` : seconds}
                    </h2>
                </div>
                <label>cateogory : {selectedCategory}</label>
                {categories.map((cate, index) => <button onClick={() => getCategoryData(cate)}
                                                         key={index}>{cate}</button>)}
                <div className="quizBox">
                    <label>{wordGame[gameIndex].quiz}</label>
                </div>
                <div className="inputBox">
                    <input type="text" value={answer} onChange={e => setAnswer(e.target.value)}/>
                    <button type="button" onClick={handleSearch}>
                        확인
                    </button>
                </div>
                <div className="userList">
                    {/*{user.map((user) => (<WordGamePlayer>user={user}</WordGamePlayer>))}*/}
                </div>
            </div>
        </>
    );
}
