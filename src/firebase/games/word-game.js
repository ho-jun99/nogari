import firebase from '../firebase-manager';

const db = firebase.firestore();


export async function getWordGameCategory() {
  const category = await db.collection("game").doc("category").get();
  return category.data();
}

export function joinRoom() {

}
