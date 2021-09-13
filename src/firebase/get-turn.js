import firebase from "./firebase-manager";
import {getUserInfo} from "./users";

const db = firebase.firestore();

export async function getUserTurn(roomNumber) {
    const res = await db.collection('game').doc(roomNumber).get().then(async (doc)=> {
        if (doc.exists) {
            const docData = doc.data();
            const memberList = docData.turn;
            //console.log(memberList)
            let membersTurn = [];
            for (const member of memberList) {
                const memberInfo = await getUserInfo(member); //user컬렉션의 문서 가져오기
                if (!memberInfo) continue;
                membersTurn.push(memberInfo.nickname);
            }
            //console.log(membersTurn);
            return membersTurn;
        } else {
            console.log("No such document!");
        }
    });
    //console.log('res : ',res)
    return res;
}