import firebase from './firebase-manager';


export async function getGameData(roomNumber) {
    console.log(roomNumber);
    const game = await firebase.firestore().collection('game').doc(roomNumber).get();
    return game.data();
}


export async function getGameRoomData(roomNumber, callback) {
    await firebase.firestore().collection('game').doc(roomNumber).onSnapshot((doc)=> {
        callback(doc.data());
    });
}

export async function setPlayers(roomNumber, players) {
    console.log(players);
    await firebase.firestore().collection("game").doc(roomNumber).update({
        players
    });
}

export async function setLiarPlayerData(roomNumber, nickname, field, fieldValue){
    const gameData = await getGameData(roomNumber);
    console.log(gameData);

    await firebase.firestore().collection("game").doc(roomNumber).update({
        ...gameData,
        players: {
            ...gameData.players,
            [nickname]: {
                ...gameData.players[nickname],
                liar: {
                    ...gameData.players[nickname].liar,
                    [field]: fieldValue,
                }
            },
        },
    });
}


export async function updateTurn(roomNumber, nickname, nextNickname){
    const gameData = await getGameData(roomNumber);

    await firebase.firestore().collection("game").doc(roomNumber).update({
        ...gameData,
        players: {
            ...gameData.players,
            [nickname]: {
                ...gameData.players[nickname],
                liar: {
                    ...gameData.players[nickname].liar,
                    'order': false,
                }
            },
            [nextNickname]: {
                ...gameData.players[nextNickname],
                liar: {
                    ...gameData.players[nextNickname].liar,
                    'order': true,
                }
            },
        },
    });
}

// 주루마블 관련 파이어스토어 업데이트 함수
export async function setFirstUserOder(roomId) {
    const gameData = await getGameData(roomId);
    let firstTurn = gameData.turn[0];

        await firebase.firestore().collection("game").doc(roomId).update({
            ...gameData,
            players: {
                ...gameData.players,
                [firstTurn]: {
                    ...gameData.players[firstTurn],
                    alcoholRoulette: {
                        ...gameData.players[firstTurn].alcoholRoulette,
                        order : true,
                    }
                }

            }
        });
}

export async function setRoulettePlayerData(roomNumber, point, field, fieldValue) {
    const gameData = await getGameData(roomNumber);
    let name = gameData.turn[point];

    await firebase.firestore().collection("game").doc(roomNumber).update({
        ...gameData,
        players: {
            ...gameData.players,
            [name]: {
                ...gameData.players[name],
                alcoholRoulette: {
                    ...gameData.players[name].alcoholRoulette,
                    [field]: fieldValue,
                }
            },
        },
    });
}
