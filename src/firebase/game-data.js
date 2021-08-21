import firebase from './firebase-manager';


export async function getGameData() {
    const game = await firebase.firestore().collection('game').get();
    return game.data();
}