import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAzimOlMDo7YO76Swt5nALytsWxackyZWw",
  authDomain: "cartshare-d3bec.firebaseapp.com",
  projectId: "cartshare-d3bec",
  storageBucket: "cartshare-d3bec.firebasestorage.app",
  messagingSenderId: "845663824694",
  appId: "1:845663824694:web:90f41a509885c9f8c36197",
  measurementId: "G-JKFE3TM5V7"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export { db, auth };