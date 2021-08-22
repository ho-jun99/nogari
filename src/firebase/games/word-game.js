import firebase from '../firebase-manager';

const db = firebase.firestore();


export async function getWordGameCategory() {
  const category = await db.collection("game").doc("category").get();
  return category.data();
}

export async function getRoomInfo(roomNumber, callback) {
  db.collection("rooms").doc(roomNumber).onSnapshot((doc) => {
    callback(doc.data());
  });
}

export function joinRoom() {

}