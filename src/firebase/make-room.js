import firebase from './firebase-manager';

//xport function makeRoomId(id,updates) {
   // firebase.firestore().ref('rooms/' + `${id}`).update(
      //  updates
   // )
    //const userRef = firebase.firestore().collection("users")
//}

const roomInfo = () => {
    const createRoom = () => {
        const res = firebase.firestore().collection('rooms').add({ // 닉네임+프로필 데이터 추가
        })
    }
    return (
        <div>
            <button onClick={createRoom}> 방 생성하기</button>
        </div>
    )
}