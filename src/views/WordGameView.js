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
        // await getQuiz()
    };


    let idx = 0;
    // const array = [
    //     {
    //         key: "ㅋㅍ",
    //         value: "커피"
    //     }, {
    //         key: "ㅋㅋ",
    //         value: "쿠키"
    //     }, {
    //         key: "ㅇㅇ",
    //         value: "얼음"
    //     }, {
    //         key: "ㅃㄷ",
    //         value: "빨대"
    //     }, {
    //         key: "ㅈㄱ",
    //         value: "지갑"
    //     }, {
    //         key: "ㅍㅇㅈ",
    //         value: "페이지"
    //     }, {
    //         key: "ㄱㅂ",
    //         value: "가방"
    //     }, {
    //         key: "ㅋㄷ",
    //         value: "카드"
    //     }, {
    //         key: "ㅇㄹ",
    //         value: "유리"
    //     }, {
    //         key: "ㅅㄱ",
    //         value: "시계"
    //     },
    // ];
    let rand_Qz = [];
    // let total = array.length;
    let total = wordGame.length;
    console.log('total',total);
    let num, cur;
    const Random = () => {
        num = 0
        cur = 0
        for (let i = total; i > 0; i--) {
            num = Math.random();
            cur = Math.floor(num * (i));

            // rand_Qz.push(array[cur]);
            rand_Qz.push(wordGame[cur]);
        }

    }
    Random();

    const [state, setState] = useState({
        //isSubmitted: false,
        // value: rand_Qz[idx].key,
        value: rand_Qz[idx].quiz,
        // ans: ue: rand_Qz[idx].key,
        ans: rand_Qz[idx].answer
    })

    const [value, setValue] = React.useState();
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
                setState({value: rand_Qz[idx].quiz, ans: rand_Qz[idx].answer});
                Random();
                setValue('');
            }

        }, 1000);
        return () => clearInterval(countdown);
    }, [seconds]);


    const handleSearch = () => {
        console.log(state.ans);
        console.log(state.value);

        if (state.ans === value) {
            alert("정답")
            setSeconds(30);
            // setState({value: rand_Qz[idx].key, ans: rand_Qz[idx].value});
            setState({value: rand_Qz[idx].quiz, ans: rand_Qz[idx].answer});
            Random();
            setValue('');

        }


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
                    {
                        state.ans !== value && state.value.length === 2 && <div className="quizBox">
                            <div>{state.value[0]}</div>
                            <div>{state.value[1]}</div>
                        </div>
                    }
                </div>
                <div className="boxwrapper">

                    {
                        state.ans !== value && state.value.length === 3 && <div className="quizBox">
                            <div>{state.value[0]}</div>
                            <div>{state.value[1]}</div>
                            <div>{state.value[2]}</div>
                        </div>
                    }
                </div>
                <div className="boxwrapper">
                    {
                        state.ans === value && <div className="quizBox">
                            <div>정</div>
                            <div>답</div>
                        </div>
                    }
                </div>
                <div style={{display: "block"}}>
                    <input className="input" type="text" value={value} onKeyUp={handleSearch}
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
