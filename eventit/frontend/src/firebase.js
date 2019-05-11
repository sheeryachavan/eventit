import firebase from 'firebase'
const config = {
  apiKey: "AIzaSyDSo5OxmGOKelOaCUym2A_8Xak2Eu3i8IY",
  authDomain: "eventit-38374.firebaseapp.com",
  databaseURL: "https://eventit-38374.firebaseio.com",
  projectId: "eventit-38374",
  storageBucket: "eventit-38374.appspot.com",
  messagingSenderId: "254809571333"
}
firebase.initializeApp(config)
export const auth = firebase.auth()
export default firebase