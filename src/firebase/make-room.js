import firebase from './firebase-manager';

export function makeRoomId(id,updates) {
    firebase.database().ref('rooms/' + `${id}`).update(
        updates
    )
}