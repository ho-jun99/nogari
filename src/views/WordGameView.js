import React from 'react';
import {useState, useEffect} from "react";
import './WordGameView.css';

export default function WordGameView() {
    const [category, setCategory] = useState('인물');
    const [seconds, setSeconds] = useState(30);

    useEffect(() => {
        const countdown = setInterval(() => {
            if (parseInt(seconds) > 0) {
                setSeconds(parseInt(seconds) - 1);
            } else {
                setSeconds(parseInt(30));
            }
        }, 1000);
        return () => clearInterval(countdown);
    }, [seconds]);

    const idx = 0;
    const array= {
        quiz:['ㅌㅊ', 'ㄱㅊ', 'ㅈㄱ', 'ㅇㄴㅇ', 'ㅎㄱ','ㅋㅍ','ㅇㅋ','ㄱㅁㄷ','ㄷㅌㅇ','ㅁㅅㅋ','ㅋㄹㄴ','ㅈㄹ','ㅈㄹㅅㅈ'],
        ans:['탈출','김치','제기','윷놀이','한글','커피','윙크','국민대','도티오','마스크','코로나','정릉','정릉시장'],
    }

    const rand_Qz = [];
    const quizAns = [];

    const total = array.quiz.length;
    let num, cur;
    const Random=()=>{
        for(let i=total; i>0; i--){
            num = Math.random();
            cur = Math.floor(num*(i));

            rand_Qz.push(array.quiz[cur]);
            array.quiz.pop(array.quiz[cur]);
            quizAns.push(array.ans[cur]);
            array.ans.pop(array.ans[cur]);


            array.quiz.splice(cur,1);
            array.ans.splice(cur,1);

        }

    }
    Random();
    for(let i=0; i<rand_Qz.length; i++){
        console.log(rand_Qz[i]);
        console.log(quizAns[i]);
    }

    const [state, setState] = useState({
        //isSubmitted: false,
        value: rand_Qz[idx],
        ans: quizAns[idx]
    })

    const [value,setValue]=React.useState();

    const handleSearch = ()=>{
        console.log(state.ans);
        console.log(state.value);

        if(state.ans===value){

            alert("정답")

            setState({value:rand_Qz[idx],ans:quizAns[idx]});
            Random();
            setValue('');

        }


    }
    return (
        <>
            <div className="main">
                <div className="categoryBox">
                    <label>카테고리 : {category}</label>
                </div>
                <div className="countDown">
                    <label>남은시간</label>
                    <label>{seconds}</label>
                </div>
                <div className="wordQuizBox">
                    <label>제시어</label>
                    <label className="wordQuiz">{state.value}</label>
                </div>
                {/*초성 게임 메인 페이지*/}
                {/*<div className="quizBox">*/}
                {/*    <label>{state.value}</label>*/}
                {/*</div>*/}
                <div className="inputBox">
                    <input type="text" value={value} onChange={e=>setValue(e.target.value)} />
                    <button type="button" onClick={handleSearch}>
                        save
                    </button>
                </div>
            </div>
        </>
    );
}
