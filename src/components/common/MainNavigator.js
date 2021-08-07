import React from 'react';
import { Link } from 'react-router-dom';

export default function MainNavigator() {
  return (
    <>
      <div>
        <ul>
          <li><Link to="/">메인으로</Link></li>
          <li><Link to="/liar">라이어게임</Link></li>
          <li><Link to="/roulette">룰렛게임</Link></li>
          <li><Link to="/word">초성 게임</Link></li>
          <li><Link to="/Choose_Char">캐릭터 선택</Link></li>
          <li><Link to="/find">방찾기</Link></li>
        </ul>
      </div>
    </>
  );
}
