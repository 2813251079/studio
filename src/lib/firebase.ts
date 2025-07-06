
import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAVS6YAtIHica96_0sA3lV8vrWv5qqZjmk",
  authDomain: "workspace-symphony-70n4i.firebaseapp.com",
  projectId: "workspace-symphony-70n4i",
  storageBucket: "workspace-symphony-70n4i.firebasestorage.app",
  messagingSenderId: "288399007235",
  appId: "1:288399007235:web:d0a44e507558ca4624f836"
};

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let isFirebaseConfigured: boolean;

try {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    isFirebaseConfigured = true;
} catch (e) {
    console.error("Failed to initialize Firebase. Auth features will be disabled.", e);
    app = undefined;
    auth = undefined;
    isFirebaseConfigured = false;
}

export { app, auth, isFirebaseConfigured };
