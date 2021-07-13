import react, {useState} from "react";
import Card from "../components/Card"

const MyInput = () => {
	const [myValue,setValue] = useState({
		cardValue : '',
		passValue : '',
	});
	const [cardAmount,setCardAmount] = useState(0);
	const [passAmount,setPassAmount] = useState(0);

	const {cardValue,passValue} = myValue;
	const inputChange = (e) =>{
		const {name,value} = e.target;
		setValue({
			...myValue,
			[name] : Number(value),
		});
	};

	const handleOnClick = (e) => {
		setCardAmount(myValue['cardValue']);
		setPassAmount(myValue['passValue']);
		
	};

	return (
		<div>
			<section className="inputWrap">
				<input type="number" placeholder="카드 개수" onChange={inputChange} name="cardValue"/>
				<input type="number" placeholder="패스 개수" onChange={inputChange} name="passValue"/>
				<button onClick={handleOnClick}>확인</button>
				<h1>card Value : {myValue['cardValue']}</h1>
				<h1>card Amount :{cardAmount}</h1>
				<h1>pass Value : {myValue['passValue']}</h1>
				<h1>pass Amount :{passAmount}</h1>
				<hr/>
			</section>
			<section className="cardWrap">
				<Card cardAmount={cardAmount} passAmount={passAmount}/>
			</section>
			
		</div>

	);
}

export default MyInput;