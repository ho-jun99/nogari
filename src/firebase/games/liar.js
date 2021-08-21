import firebase from '../firebase-manager';

const db = firebase.firestore();

export async function getWord(roomNumber, word) {
    console.log(roomNumber);
    await db.collection("game").doc(`${roomNumber}`).update({
        liar:{
            question: word
        }
    });
}

export async function setPlayers(roomNumber, player) {
    console.log(player);
    await firebase.firestore().collection("game").doc(roomNumber).update({
            players: player

    });
}