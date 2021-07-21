import '../components/css/card.css'

const RouletteCard = (props) => {
    const data = [ // 카드 내용
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

    // 앞으로 뽑을 카드를 저장할 리스트
    let dummy = [];
    // pass card 섞기 위한 변
    let myRandom;

    const shuffleCard = (card,pass) => {
        // 카드 수보다 패스 수가 많을 때
        if( card < pass ) alert("Check your number!")
        // 카드 수만큼 랜덤 뽑기
        for( let i=0; i < card; i++ ){
            dummy.push(data[Math.floor(Math.random()*(data.length-1)+1)]); //data 길이 미만, 1 이상의 수 사이에서 random 뽑는 거!
        }
        // 이미 뽑은 카드에 pass 덮어 씌우기
        while(pass > 0 ){
            myRandom = Math.floor(Math.random()*(card)); // card 미만의 랜덤 정수 뽑기
            if(dummy[myRandom].id == 0){
                continue;
            }else {
                dummy[myRandom] = data[0];
                pass--;
            }
        }
        return dummy;
    }

    // 실행 함수
    let cnt = 0;
    const renderData = shuffleCard(props.cardAmount, props.passAmount).map((item,index)=> {
        return (
            <li key={cnt++} className="inCardWrap">
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

export default RouletteCard;