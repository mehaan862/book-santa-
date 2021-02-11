import firebase from 'firebase';
require('@firebase/firestore')

  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCmGWF32mSukCgS7brJRJwVsfJls3Q6v7I",
    authDomain: "booksantaapp-9e61d.firebaseapp.com",
    projectId: "booksantaapp-9e61d",
    storageBucket: "booksantaapp-9e61d.appspot.com",
    messagingSenderId: "122585213121",
    appId: "1:122585213121:web:3e75c4eebce3f6f3d4cc40"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();