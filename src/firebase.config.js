import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore,doc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {getAuth,signOut,signInWithEmailAndPassword} from "firebase/auth";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyC3g-L03Y8xRAAiIWd-7SIFoRGfJ_p0AZ0",
  authDomain: "queenmilkshop.firebaseapp.com",
  projectId: "queenmilkshop",
  storageBucket: "queenmilkshop.firebasestorage.app",
  messagingSenderId: "408049829605",
  appId: "1:408049829605:web:58a7407727b59396a4360c",
  measurementId: "G-175W5FKG3S"
  };

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const db = getDatabase(app);
const db2 = getFirestore(app);

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
  console.log("gggg")
};




const test= async()=>{

  const frankDocRef = doc(db2, "products", "0");
  
  await setDoc(frankDocRef, {
    name: "ahmd",
    favorites: { food: "zfefz", color: "zefzef", subject: "fefeef" },
    age: 12
}).then(()=>{
  console.log(frankDocRef);
}).catch((error) => {
  // Handle Errors here.
  console.log(error.message);
  // ...
});;
  
}



export { app, db,db2,firestore,auth, storage,logInWithEmailAndPassword,logout,test };
