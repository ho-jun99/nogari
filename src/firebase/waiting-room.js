import {database} from './firebase-manager';
import { child, get } from "firebase/database";


export function getRoomInfo() {

  get(child(database, `rooms/0`)).then((snapshot) => {
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