import React, {useEffect} from 'react';
import '../css/WordGamePlayer.scss'
import Graduation_Hat from '../../views/img/졸업모자.png'
import Input_Bubble from '../../views/img/말풍선.png'

function WordGamePlayer({player, myNickname, roomNumber, updateUserData, round}) {
    useEffect(() => {
        if (player !== undefined) {
            player[myNickname].wordGame.isCorrected = false;
            player[myNickname].wordGame.inputWord = "";
            updateUserData(roomNumber, player);
        }
    }, [])

    return (
        <>
            <div className="footer">
                {player !== undefined && Object.entries(player).map((mem) => (
                    <div className="playerBox">
                        {mem[1].wordGame.inputWord === "" ?
                            <div className="inputword" style={{visibility: "hidden"}}>
                                <img src={Input_Bubble}/>
                                <h3>{mem[1].wordGame.inputWord}</h3>
                            </div> :
                            <div className={mem[1].wordGame.isCorrected ? "inputword-correct" : "inputword"}>
                                <img src={Input_Bubble}/>
                                <h3>{mem[1].wordGame.inputWord}</h3>
                            </div>
                            // <div className="inputword">
                            // <img src={Input_Bubble}/>
                            // <h3>{mem[1].wordGame.inputWord}</h3>
                            // </div>
                        }
                        <div className="playerInfo">
                            {mem[1].wordGame.isCorrected ? <div><img src={Graduation_Hat}/> {mem[0]}</div> :
                                <div>{mem[0]}</div>}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default WordGamePlayer
