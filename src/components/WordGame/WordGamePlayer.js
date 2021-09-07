import React, {useEffect} from 'react';
import '../css/WordGamePlayer.scss'

function WordGamePlayer({player, myNickname, roomNumber, updateUserData}) {
    useEffect(() => {
        if (player !== undefined) {
            player[myNickname].wordGame.isCorrected = false;
            player[myNickname].wordGame.inputWord = "";
            updateUserData(roomNumber, player);
        }
    }, [player])

    return (
        <>
            <div className="footer">
                {player !== undefined && Object.entries(player).map((mem) => (
                    <>
                        {mem[1].wordGame.inputWord !== "" && <div className="inputword">{mem[1].wordGame.inputWord}</div>}
                        <div>{mem[0]}</div>
                    </>
                ))}
            </div>
        </>
    )
}

export default WordGamePlayer
