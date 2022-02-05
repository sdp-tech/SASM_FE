import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js';
import {getAuth, onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js'; 
import './index.css';


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
console.log(auth);

onAuthStateChanged(auth, user => {
    if(user != null ) {
        console.log('logged in!');
    } else {
        console.log('No user');
    }
});

ReactDOM.render( <App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals