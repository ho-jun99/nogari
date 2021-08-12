import React, {useState} from "react";
import RouletteCard from "./RoletteCard"

const RouletteInput = () => {
	// card 수 pass 수 받을 준비 (인풋에 따라 바뀔 수 있게)
	const [myValue,setValue] = useState({
		cardValue : '',
		passValue : '',
	});
	const {cardValue,passValue} = myValue;

	// Input 감지
	const inputChange = (e) =>{
		const {name,value} = e.target;
		setValue({
			...myValue,
			[name] : Number(value),
		});
	};
	// 버튼 누를 때 마다 상태 바꾸기 True / False
	const [condition, setCondition] = useState(false);
	const toggle = () => setCondition(!condition);

	// T/F 상태에 따라 렌더 나누
	const  renderCondition = condition
		? <div>
			<section className="inputWrap">
				<button onClick={toggle}>다시 하기</button>
				<RouletteCard cardAmount={cardValue} passAmount={passValue}/>
			</section>
		</div>
		: <div>
			<section className="cardWrap">
				<input type="number" placeholder="카드 개수" onChange={inputChange} name="cardValue"/>
				<input type="number" placeholder="패스 개수" onChange={inputChange} name="passValue"/>
				<button onClick={toggle}>확인</button>
				<h1>card Value : {myValue['cardValue']}</h1>
				<h1>card Amount :{cardValue}</h1>
				<h1>pass Value : {myValue['passValue']}</h1>
				<h1>pass Amount :{passValue}</h1>
			</section>
		</div>

	return (
		<div>
			{renderCondition}
		</div>
	);
}

export default RouletteInput;
