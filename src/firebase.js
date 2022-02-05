//firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";
import { 
  getAuth,// authentication 설정
  signInWithIdAndPassword,// Id 로그인
  createUserWithEmailAndIdAndPassword, //email + Id 회원가입
} from 'https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js';

// const firebaseApp
const firebaseApp = initializeApp({
  apiKey: "AIzaSyAu8vDc2i2AClvjQQwC17-Bltq1fkIgklU",
  authDomain: "sdp-sasm.firebaseapp.com",
  projectId: "sdp-sasm",
  storageBucket: "sdp-sasm.appspot.com",
  messagingSenderId: "76930051118",
  appId: "1:76930051118:web:fd7017d6cf07729139c3bf",
  measurementId: "G-VNG0L9XCDB"
});
const auth = getAuth(firebaseApp);
//...

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Id 로그인
export const loginId = (Id, password) => {
  return signInWithIdAndPassword(auth, Id, password);
};

//Email + Id 회원가입
export const signupEmailAndId = (email, Id, password) => {
  return createUserWithEmailAndIdAndPassword(auth, email, Id, password);
};