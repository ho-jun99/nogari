import firebase from './firebase-manager';

export function getRoomInfo() {

  const getData = firebase.database().ref('rooms').child('0').get().then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}

export function joinRoom() {

}