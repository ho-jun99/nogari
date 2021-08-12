import firebase from './firebase-manager';


export async function createUser(nickname, profile) {
    const res = await firebase.firestore().collection('users').add({ // 닉네임+프로필 데이터 추가
        nickname,
        profile,
        badges: {alcohol:0, roulette:0, liar:0},
        created: new Date().getTime()
    });
    return res.id;
}