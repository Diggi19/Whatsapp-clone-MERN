import firebase from "firebase";



const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBFZyso1RUMKlzLYh4NMZ9JLcTi2vxetW8",
    authDomain: "whatsapp-mern-ad022.firebaseapp.com",
    projectId: "whatsapp-mern-ad022",
    storageBucket: "whatsapp-mern-ad022.appspot.com",
    messagingSenderId: "584659864206",
    appId: "1:584659864206:web:9037097fa41d299c0797df",
    measurementId: "G-GT26JH1YGP"
})

const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()


export {db,auth,provider}