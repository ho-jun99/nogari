import React from 'react';
import Modal from 'react-modal'
import {useState, useEffect} from "react";
import './css/WordGameView.css';
import TimeoutModal from './Timeout'
import {getWordGameCategory, getPlayers} from "../../firebase/games/word-game";
import {updateUserData} from "../../firebase/games/liar";
import WordGamePlayer from "../../components/WordGame/WordGamePlayer";
import WordGameTimer from "../../components/WordGame/WordGameTimer";
import WordGameQuizBox from "../../components/WordGame/WordGameQuizBox";

export default function WordGameView({match}) {
    const [categoryData, setCategoryData] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [wordGame, setWordGame] = useState([
        {
            quiz: '',
            answer: '',
        }
    ]);

    const [random, setRandom] = useState([]);
    const [state, setState] = useState()
    const [round, setRound] = useState(0);
    const [player, setPlayer] = useState();

    const [value, setValue] = useState();
    const [seconds, setSeconds] = useState(30);

    const [modalOpen, setModalOpen] = useState(false);

    const roomNumber = localStorage.getItem('roomNumber');
    const myNickname = localStorage.getItem('nickname');

    const totalRound = 2; // 한 카테고리에서 출제될 문제 수 // 현재 firebase data에 카테고리당 6개의 데이터가 들어있어 6개 이하로 설정해야 함.

    // 랜덤하게 추출
    const getRandom = (min, max) => {
        return Math.floor((Math.random() * (max - min + 1)) + min);
    }

    const getRandomArray = (min, max, count) => {
        if (max - min + 1 < count) return;

        let randomArr = [];
        while (1) {
            let index = getRandom(min, max);

            // 중복 여부를 체크
            if (randomArr.indexOf(index) > -1) {
                continue;
            }

            randomArr.push(index);

            // 원하는 배열 갯수가 되면 종료
            if (randomArr.length == count + 1) {
                break;
            }
        }

        // 중복되지 않는 범위 내의 인덱스 array : randomArr ex ) randomArr = [0, 1, 3, 4, 2]
        // wordGame에는 해당 카테고리의 quiz와 answer쌍이 들어있음
        // arr에 wordGame[0], wordGame[1], wordGame[3], ... 넣어줌
        // 이러한 arr를 setRandom
        let arr = [];
        randomArr.map(num => {
            arr.push(wordGame[num])
        });
        setRandom(arr);
    }

    // category 버튼 클릭시 문제를 setting하는 부분
    const getQuiz = () => {
        let total = wordGame.length;
        getRandomArray(0, total - 1, totalRound);
    }

    const init = async () => {
        const playerData = await getPlayers(match.params.roomId);
        setPlayer(playerData['players']);
        console.log(2)
        setSelectedCategory(playerData['wordGame'].category);
        // player[myNickname].wordGame.isCorrected = false;
        // updateUserData(roomNumber, player)
    };

    const setWordGameData = async (categoryName) => {
        const gameData = await getWordGameCategory();
        let arr = [];
        gameData !== undefined && categoryName !== '' && Object.entries(gameData[categoryName]).map((data) => arr.push({
            quiz: data[0],
            answer: data[1]
        }));
        setWordGame(arr);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }
    const handleSearch = async () => {
        player[myNickname].wordGame.inputWord = value;
        if (state.ans === value) {
            player[myNickname].wordGame.isCorrected = true;
            alert("정답");
            setSeconds(30);
            // 일단은 라운드 2까지 밖에 없으니까 라운드 다 되면 0으로 다시 초기화 해줍니다
            totalRound !== round ? setRound(round + 1) : setRound(0);
            setState({value: random[round].quiz, ans: random[round].answer});
        } else {
            alert('오답!');
            player[myNickname].wordGame.isCorrected = false;
        }
        setValue('');
        await updateUserData(roomNumber, player);
    }

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        const exit = setInterval(() => {
            setModalOpen(false)
        }, 3000)
    }

    useEffect(() => {
        init();
    }, []);

    useEffect(() => {
        random[0] !== undefined && console.log(random)
        random[0] !== undefined && setState({
            //isSubmitted: false,
            value: random[round].quiz,
            ans: random[round].answer
        })
    }, [random])


    useEffect(() => {
        setWordGame([]);
        setWordGameData(selectedCategory);
    }, [selectedCategory]);

    useEffect(() => {
        getQuiz()
    }, [wordGame]);

    // round가 증가하면 quiz state를 set
    useEffect(() => {
        random[0] !== undefined && setState({value: random[round].quiz, ans: random[round].answer});
        if (player !== undefined) {
            player[myNickname].wordGame.inputWord = "";
            updateUserData(roomNumber, player)
        }
    }, [round])

    return (
        <>
            <div className="main_wordgame">
                {/*{categories.map((cate, index) => <button onClick={() => getCategoryData(cate)}*/}
                {/*                                         key={index}>{cate}</button>)}*/}
                <div className="category"
                     style={{fontFamily: "DungGeunMo", fontWeight: "bold", fontSize: "28.4571px", textAlign: "center"}}>
                    카테고리 : {selectedCategory}
                </div>
                <WordGameTimer seconds={seconds} setSeconds={setSeconds} totalRound={totalRound} round={round} setRound={setRound} setValue={setValue}/>
                <WordGameQuizBox state={state} value={value}/>
                <div style={{display: "block"}}>
                    <input className="input" type="text" value={value} placeholder={(player !== undefined && player[myNickname].wordGame.isCorrected) ? "이미 정답을 맞추셨습니다!" : "정답을 입력해주세요"}
                           onKeyPress={handleKeyPress}
                           onChange={e => setValue(e.target.value)}
                           disabled={player !== undefined && player[myNickname].wordGame.isCorrected}/>
                </div>
                <div>
                    {
                        !seconds && <TimeoutModal open={openModal} close={closeModal}>Timeout</TimeoutModal>
                    }
                </div>
                <WordGamePlayer player={player} myNickname={myNickname} roomNumber={roomNumber} updateUserData={updateUserData}/>
            </div>
        </>
    );
}
