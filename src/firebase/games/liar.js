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