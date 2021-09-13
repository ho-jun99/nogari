import firebase from './firebase-manager';


export async function getGameData(roomNumber) {
    //console.log(roomNumber);
    const game = await firebase.firestore().collection('game').doc(roomNumber).get();
    return game.data();
}

export async function setPlates(roomNumber, plate){
    const gameData = await getGameData(roomNumber)

    await firebase.firestore().collection("game").doc(roomNumber).update({
        ...gameData,
        rottenPlates: {
            plate
        },
    });
}

export async function getGameRoomData(roomNumber, callback) {
    await firebase.firestore().collection('game').doc(roomNumber).onSnapshot((doc)=> {
        callback(doc.data());
    });
}

export async function setPlayers(roomNumber, players) {
    //console.log(players);
    await firebase.firestore().collection("game").doc(roomNumber).update({
        players
    });
}

export async function setLiarPlayerData(roomNumber, nickname, field, fieldValue){
    const gameData = await getGameData(roomNumber)

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

export async function setRoulettePlayerData(roomNumber, nickname){
    const gameData = await getGameData(roomNumber)

    await firebase.firestore().collection("game").doc(roomNumber).update({
        ...gameData,
        players: {
            ...gameData.players,
            [nickname]: {
                ...gameData.players[nickname],
                rottenPlates: {
                    //...gameData.players[nickname].rottenPlates,
                    'order' : true,
                }
            },
        },
    });
}

export async function setLiarData(roomNumber, field, fieldValue){
    const gameData = await getGameData(roomNumber);
    console.log("!");

    await firebase.firestore().collection("game").doc(roomNumber).update({
        ...gameData,
        liar : {
            ...gameData.liar,
            [field]: fieldValue,
        }
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
export async function updateRouletteTurn(roomNumber, nickname, nextNickname){
    const gameData = await getGameData(roomNumber);

    await firebase.firestore().collection("game").doc(roomNumber).update({
        ...gameData,
        players: {
            ...gameData.players,
            [nickname]: {
                ...gameData.players[nickname],
                rottenPlates: {
                    'order': false,
                }
            },
            [nextNickname]: {
                ...gameData.players[nextNickname],
                rottenPlates: {
                    'order': true,
                }
            },
        },
    });
}

// export async function setRoulettePlayerData(roomNumber, nickname, field, fieldValue){
//     const gameData = await getGameData(roomNumber);
//     console.log(gameData);
//
//     await firebase.firestore().collection("game").doc(roomNumber).update({
//         ...gameData,
//         players: {
//             ...gameData.players,
//             [nickname]: {
//                 ...gameData.players[nickname],
//                 rottenPlates: {
//                     ...gameData.players[nickname].rottenPlates,
//                     [field]: fieldValue,
//                 }
//             },
//         },
//     });
// }