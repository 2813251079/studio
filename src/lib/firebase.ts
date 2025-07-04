
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

let app: FirebaseApp;
let auth: Auth;

// Since the credentials are now hardcoded, we can assume Firebase is always configured.
// This simplifies the logic and removes potential issues with environment variable loading.
export const isFirebaseConfigured = true;

try {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
} catch (e) {
    console.error("Failed to initialize Firebase", e);
    // In a real-world scenario, you might want to handle this error more gracefully.
}

export { app, auth };
