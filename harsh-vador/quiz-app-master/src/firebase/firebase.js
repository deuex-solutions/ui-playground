import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCaS9Ef6VQfSKV_-44yRlr18MMAtZ25528",
  authDomain: "quiz-app-72d15.firebaseapp.com",
  projectId: "quiz-app-72d15",
  storageBucket: "gs://quiz-app-72d15.appspot.com",
  messagingSenderId: "524762819973",
  appId: "1:524762819973:web:5b67e6966bd073bc44e8ec",
  measurementId: "G-12BQ1692KY",
  databaseURL: "https://quiz-app.firebaseio.com",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.auth();

export default firebase;
