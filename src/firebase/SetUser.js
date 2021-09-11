import firebase from "./firebase-manager";
import {getUserInfo} from "./users";
import {getGameData} from "./game-data";

const db = firebase.firestore()

export async function setUser(roomNumber) {
    const gameData = await getGameData(roomNumber);

    const shuffle = (array) => {
        const shuffleArray = [...array];
        shuffleArray.sort( ()=> Math.random() - 0.5 );
        return shuffleArray;
    }

    await db.collection('rooms').doc(roomNumber).get().then((doc) => {
        if (doc.exists) {
            let members = [];
            const data = async () => {
                const memberList = doc.data().members;

                for await (const member of memberList) {
                    const memberInfo = await getUserInfo(member); //user컬렉션의 문서 가져오기
                    if (!memberInfo) continue;
                    members.push(memberInfo.nickname);
                }
                await db.collection('game').doc(roomNumber).update({
                    ...gameData,
                    turn: shuffle(members)
                })
                data();
            }

        }
        else {
            console.log("No such document!");
        }
    })
}