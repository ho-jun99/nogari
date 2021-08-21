import React, {useEffect, useState} from 'react';
import {getWordGameCategory} from "../firebase/games/word-game";
import {getWord} from "../firebase/games/liar";

export default function LiarGameView({ match }) {
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

  return (
    <>
      <div>
          {categories.map((cate) => <button onClick={() => getCategoryData(cate)}>{cate}</button>)}
          {word ? (<div>{word}</div>):null}
      </div>
    </>
  );
}