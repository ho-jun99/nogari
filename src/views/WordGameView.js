import React from 'react';
import Modal from 'react-modal'
import {useState, useEffect} from "react";
import './WordGameView.css';
import TimeoutModal from './Timeout'
import {getWordGameCategory} from "../firebase/games/word-game";

export default function WordGameView() {
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
    const [gameIndex, setGameIndex] = useState(0);

    const [state, setState] = useState()
    // const [round, setRound] = useState(0);

    let round = 0;
    // 랜덤하게 추출
    const getRandom = (min, max) => {
        return Math.floor((Math.random() * (max - min + 1)) + min);
    }

    const getRandomArray = (min, max, count) => {
        if (max - min + 1 < count) return;

        let rst = [];
        while (1) {
            let index = getRandom(min, max);

            // 중복 여부를 체크
            if (rst.indexOf(index) > -1) {
                continue;
            }

            rst.push(index);

            // 원하는 배열 갯수가 되면 종료
            if (rst.length == count) {
                break;
            }
        }
        let arr = [];
        console.log(rst)
        // rst.forEach()
        rst.map(num => {
            // console.log(wordGame[num], random)
            // setRandom(random => [...random, wordGame[num]])
            arr.push(wordGame[num])
        });
        console.log(arr);
        setRandom(arr);
    }

    useEffect(() => {
        random[0] !== undefined && console.log(random)
        random[0] !== undefined && setState({
            //isSubmitted: false,
            // value: rand_Qz[idx].key,
            value: random[round].quiz,
            // ans: ue: rand_Qz[idx].key,
            ans: random[round].answer
        })
    }, [random])


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
        console.log("component did mount")
    }, []);

    const getCategoryData = (categoryName) => {
        console.log("1")
        setSelectedCategory(categoryName);
        setWordGame([]);
        makeEntries(categoryName)
    };

    const makeEntries = (categoryName) => {
        let arr = [];
        // Object.entries(categoryData[categoryName]).map((data) => setWordGame(wordGame => [...wordGame, {
        //     quiz: data[0],
        //     answer: data[1]
        // }]));
        Object.entries(categoryData[categoryName]).map((data) => arr.push({
            quiz: data[0],
            answer: data[1]
        }));
        setWordGame(arr);
    }

    useEffect(() => {
        getQuiz()
    }, [wordGame])

    let idx = 0;

    const getQuiz = () => {
        let total = wordGame.length;
        console.log(wordGame)
        console.log('total', total);
        getRandomArray(0, total - 1, 5);
        console.log(random);
    }
    let rand_Qz = [];
    // let total = array.length;
    let total = wordGame.length;

    // let num, cur;
    // const Random = () => {
    //     num = 0
    //     cur = 0
    //     for (let i = total; i > 0; i--) {
    //         num = Math.random();
    //         cur = Math.floor(num * (i));
    //
    //         // rand_Qz.push(array[cur]);
    //         rand_Qz.push(wordGame[cur]);
    //     }
    //     console.log(rand_Qz);
    //
    // }
    // Random();

    const [value, setValue] = useState();
    const [seconds, setSeconds] = useState(30);

    useEffect(() => {
        const countdown = setInterval(() => {
            if (parseInt(seconds) > 0) {
                setSeconds(parseInt(seconds) - 1);
            } else {
                setInterval(() => {
                    setSeconds(30);
                }, 3000)

                // setState({value: rand_Qz[idx].key, ans: rand_Qz[idx].value});
                // setRound(round + 1)
                round = round + 1;
                setState({value: random[round].quiz, ans: random[round].answer});
                // setGameIndex(gameIndex + 1);
                // Random();
                // setValue('');
            }

        }, 1000);
        return () => clearInterval(countdown);
    }, [seconds]);


    // const setNextRound = () => (num = round; setRound(num))
    const [answer, setAnswer] = useState('');
    const handleSearch = async () => {
        if (state.ans === value) {
            alert("정답")
            setSeconds(30);
            console.log('br', round)
            round = round + 1;
            // setRound(round + 1);
            setState({value: random[round].quiz, ans: random[round].answer});
            // await Promise.all([setRound(num), setState({value: random[round].quiz, ans: random[round].answer})])
            // setRound(round + 1)
            console.log('ar', round)
            // setState({value: random[round].quiz, ans: random[round].answer});
            // Random();
            setValue('');

        }

        // if (answer && answer === wordGame[random[gameIndex]].answer) {
        //     alert('정답');
        //     setGameIndex(gameIndex + 1);
        //     setAnswer('');
        //     setSeconds(30);
        // } else {
        //     alert('다시 시도');
        // }
    }


    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        const exit = setInterval(() => {
            setModalOpen(false)
        }, 3000)
    }

    return (
        <>

            <div className="main_wordgame">
                {categories.map((cate, index) => <button onClick={() => getCategoryData(cate)}
                                                         key={index}>{cate}</button>)}
                <div className="category"
                     style={{fontFamily: "DungGeunMo", fontWeight: "bold", fontSize: "28.4571px", textAlign: "center"}}>
                    카테고리 : {selectedCategory}
                </div>
                <div style={{
                    fontFamily: "DungGeunMo",
                    marginTop: "26px",
                    fontSize: "22.2893px",
                    textAlign: "center",
                    lineHeight: "26px",
                    lineSpacing: "0.01em",
                    color: "#535353"
                }}> 남은 시간
                    {
                        seconds >= 20 && <div style={{
                            marginTop: "15px",
                            fontFamiy: "DungGeunMo",
                            fontSize: "37.1488px",
                            textAlign: "center",
                            lineHeight: "44px",
                            lineSpacing: "0.01em",
                            color: "#1B9659"
                        }}>{seconds}</div>
                    }
                    {
                        seconds >= 10 && seconds < 20 && <div style={{
                            marginTop: "15px",
                            fontFamiy: "DungGeunMo",
                            fontSize: "37.1488px",
                            textAlign: "center",
                            lineHeight: "44px",
                            lineSpacing: "0.01em",
                            color: "#FF8F1D"
                        }}>{seconds}</div>
                    }
                    {
                        seconds < 10 && <div style={{
                            marginTop: "15px",
                            fontFamiy: "DungGeunMo",
                            fontSize: "37.1488px",
                            textAlign: "center",
                            lineHeight: "44px",
                            lineSpacing: "0.01em",
                            color: "#FF0000"
                        }}>{seconds}</div>
                    }

                </div>
                <div className="boxwrapper">
                    <div className="quizBox">
                    {
                        (state !== undefined && state.ans !== value)
                        &&
                        state.value.split('').map((letter) => (
                           <div>{letter}</div>
                        ))
                    }
                    </div>
                </div>
                {/*<div className="boxwrapper">*/}

                {/*    {*/}
                {/*        state !== undefined && state.ans !== value && state.value.length === 2 && <div className="quizBox">*/}
                {/*            <div>{state.value[0]}</div>*/}
                {/*            <div>{state.value[1]}</div>*/}
                {/*        </div>*/}
                {/*    }*/}
                {/*</div>*/}{/*<div className="boxwrapper">*/}

                {/*    {*/}
                {/*        state !== undefined && state.ans !== value && state.value.length === 3 && <div className="quizBox">*/}
                {/*            <div>{state.value[0]}</div>*/}
                {/*            <div>{state.value[1]}</div>*/}
                {/*            <div>{state.value[2]}</div>*/}
                {/*        </div>*/}
                {/*    }*/}
                {/*</div>*/}
                <div className="boxwrapper">
                    {
                        state !== undefined && state.ans === value && <div className="quizBox">
                            <div>정</div>
                            <div>답</div>
                        </div>
                    }
                </div>
                <div style={{display: "block"}}>
                    <input className="input" type="text" value={value} placeholder="정답을 입력해주세요" onKeyUp={handleSearch}
                           onChange={e => setValue(e.target.value)}/>
                </div>
                <div>
                    {
                        !seconds && <TimeoutModal open={openModal} close={closeModal}>Timeout</TimeoutModal>

                    }
                </div>
                <div className="footer">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>

                </div>


            </div>
        </>
    );
}
