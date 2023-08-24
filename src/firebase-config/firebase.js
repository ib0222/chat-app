import { initializeApp } from "firebase/app";

import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyAFOu-JAEkTRmng5aNbX9x5LLzzmxzBCfE",
    authDomain: "chat-app-d4733.firebaseapp.com",
    projectId: "chat-app-d4733",
    storageBucket: "chat-app-d4733.appspot.com",
    messagingSenderId: "546873179616",
    appId: "1:546873179616:web:70e345a6150bf37c27bf85",
    measurementId: "G-42H0DX4P9S"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const db = getFirestore(app)