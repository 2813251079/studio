
import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let isFirebaseConfigured: boolean;

try {
    // Check that all required environment variables are set
    if (
        !firebaseConfig.apiKey ||
        !firebaseConfig.authDomain ||
        !firebase.Config.projectId
    ) {
        throw new Error("Missing Firebase configuration. Please check your .env file.");
    }

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
