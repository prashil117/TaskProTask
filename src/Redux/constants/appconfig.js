import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCB_vQWweiP9O2MGMA_1MIupSE7lVQlpYo",
    authDomain: "taskprotestapp.firebaseapp.com",
    databaseURL: "https://taskprotestapp.firebaseio.com",
    projectId: "taskprotestapp",
    storageBucket: "taskprotestapp.appspot.com",
    messagingSenderId: "829939131557",
    appId: "1:829939131557:web:1c23655a69e29d25f8d94c",
    measurementId: "G-241W5BGMF5"
};
firebase.initializeApp(firebaseConfig);
export default firebase;