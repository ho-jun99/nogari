import { render } from "@testing-library/react";
import react, {useState} from "react";
import '../components/css/card.css'

const Card = (props) => {
  	const data = [
		{
			id : 0,
			desc : "통과",
		},
		{
			id : 1,
			desc : "술 한잔 더 먹기",
		},
		{
			id : 2,
			desc : "엉덩이로 이름 쓰기",
		},
		{
			id : 3,
			desc : "노래 부르기",
		},
		{
			id : 4,
			desc : "옛날 이야기하기",
		},
		{
			id : 5,
			desc : "소재 고갈",
		},
		{
			id : 6,
			desc : "6번째 마지막임",
		},
	];
  let dummy = [];
  let myRandom;
  const shuffleCard = (card,pass) => {
    dummy = [];
    if( card < pass ) {
      card = 4;
      pass = 1;
    }
    for(let i=0; i<card; i++){
      dummy.push(data[Math.floor(Math.random()*(data.length-1)+1)]);
    }
    while(pass > 0 ){
      myRandom = Math.floor(Math.random()*(card));
      if(dummy[myRandom].id == 0){
        continue;
      }else {
        dummy[myRandom] = data[0];
      pass--;
      }
      console.log(myRandom);
    }
    // console.log(dummy);
    return dummy;
  } 

  const cardOnClick = (e) => {
    
  }

  let cnt = 0;
  const renderData = shuffleCard(props.cardAmount,props.passAmount).map((item,index)=> {
    return (
      <li key={cnt++} className="inCardWrap" onClick={cardOnClick}>
          <h1>{item.id}</h1>
          <h2>{item.desc}</h2>
      </li>
    )
  })

  return(
    <div>
      <ul>
      {renderData}
      </ul>
    </div>
  );
}

export default Card;