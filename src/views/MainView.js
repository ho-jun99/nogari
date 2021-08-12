import React, {useEffect, useState} from 'react';
import {getWordGameCategory} from "../firebase/games/word-game";

export default function MainView() {
  const [categoryData, setCategoryData] = useState({});
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const init = async () => {
      const gameData = await getWordGameCategory();
      const test = Object.entries(gameData);
      console.log(test);
      const category = test.map(([category, list]) => category);
      setCategories(category);
      setCategoryData(gameData);
    };
    init();
  }, []);

  const getCategoryData = (categroyName) => {
    console.log(categoryData[categroyName]);
  };

  return (
    <>
      <div>
        {categories.map((cate) => <button onClick={() => getCategoryData(cate)}>{cate}</button>)}
          게임 메인 페이지
      </div>
    </>
  );
}
