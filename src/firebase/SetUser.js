import firebase from "./firebase-manager";

export async function setUser(roomNumber) {
    const db = firebase.firestore()
    const shuffle = (array) => {
        const shuffleArray = [...array];
        shuffleArray.sort( ()=> Math.random() - 0.5 );
        return shuffleArray;
    }

    db.collection('rooms').doc(roomNumber).get().then((doc) => {
        if (doc.exists) {
            const memberList = doc.data().members;
            console.log('new : ', memberList);
            console.log(shuffle(memberList));
            db.collection('game').doc(roomNumber).update(
                {turn : shuffle(memberList)}
            )
        } else {
            console.log("No such document!");
        }
    })
}