import React from 'react';
import {useState} from "react";

export default function WordGameView() {

    var idx=0;
    const array= {
        quiz:['ㅌㅊ', 'ㄱㅊ', 'ㅈㄱ', 'ㅇㄴㅇ', 'ㅎㄱ','ㅋㅍ','ㅇㅋ','ㄱㅁㄷ','ㄷㅌㅇ','ㅁㅅㅋ','ㅋㄹㄴ','ㅈㄹ','ㅈㄹㅅㅈ'],
        ans:['탈출','김치','제기','윷놀이','한글','커피','윙크','국민대','도티오','마스크','코로나','정릉','정릉시장'],
    }
    var rand_Qz=[];
    var quizAns = [];

    var total=array.quiz.length;
    var num,cur;
    const Random=()=>{
        for(var i=total; i>0; i--){
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
    for(var i=0;i<rand_Qz.length;i++){
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
            <div>
                초성 게임 메인 페이지
                <div className="quizBox">
                    <label>{state.value}</label>
                </div>
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
