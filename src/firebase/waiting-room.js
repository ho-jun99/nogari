import firebase from './firebase-manager';

const db = firebase.firestore();


export async function getUserInfo(userId) {
  const user = await db.collection("users").doc(userId).get();
  return user.data();
}

export async function getRoomInfo(roomNumber, callback) {
  db.collection("rooms").doc(roomNumber).onSnapshot((doc) => {
    callback(doc.data());
  });
}

export function joinRoom() {

}