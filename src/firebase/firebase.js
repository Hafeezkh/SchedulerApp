// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
import { getDatabase } from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2ZghVmUCf3cW_qO6TTZmzbGEszyzEpIk",
  authDomain: "scheduler-project-dee2d.firebaseapp.com",
  projectId: "scheduler-project-dee2d",
  storageBucket: "scheduler-project-dee2d.appspot.com",
  messagingSenderId: "859864984437",
  appId: "1:859864984437:web:09ae75b76da10b86da013c",
  measurementId: "G-2Z8LXHWH1N"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };