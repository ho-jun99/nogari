import React, {useState} from 'react';
import '../../src/components/css/liarGame.css'
import SuggestionModal from "../components/LiarGame/suggestionModal";
import SpeakComponent from "../components/LiarGame/SpeakComponent";
import SelectLiarComponent from "../components/LiarGame/SelectLiarComponent";
import {getWordGameCategory} from "../firebase/games/word-game";
import {getWord} from "../firebase/games/liar";

export default function LiarGameView() {
    const [categoryData, setCategoryData] = useState({});
    const [categories, setCategories] = useState([]);
    const [word, setWord] = useState('');
    useEffect(() => {
        const init = async () => {
            const gameData = await getWordGameCategory();
            const test = Object.entries(gameData);
            console.log(test);
            const category = test.map(([category]) => category);
            setCategories(category);
            setCategoryData(gameData);
            console.log(categoryData);
        };
        init();
    }, []);

    const getCategoryData = (categoryName) => {
        const random = Math.floor(Math.random()*4);
        const gameData = categoryData[categoryName];
        console.log(gameData);
        const wordData = Object.values(gameData);
        setWord(wordData[random]);
        getWord(match.params.roomId, wordData[random]);
    };

    const [isStart, setIsStart] = useState(false); // 게임 실행 중 확인 여부 변수
    const [continueGame, setContinueGame] = useState(false);
    const startGame = () => { // 게임이 시작되면 발언하는 화면으로 이동
        setIsStart(true);
    }
    const goStop = (result) => { // true 이면, 투표 화면으로 이동. false 인 경우 첫 사용자부터 다시 발언 재개
        setContinueGame(result);
    }


    if (isStart && !continueGame) {
        return (
            <>
                <div className='container'>
                    <div className='inner-container'>
                        <SpeakComponent goStopResult={goStop}/>
                    </div>
                </div>
            </>
        )
    } else if (isStart && continueGame) {
        return (
            <>
                <div className='container'>
                    <div className='inner-container'>
                        <SelectLiarComponent/>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className='container'>
                    <div className='inner-container'>
                        <SuggestionModal/>
                    </div>
                </div>
                <input type="button" value="누르면 게임 실행됨" onClick={startGame} className="tempBtn"/>
            </>
        );
    }
}
