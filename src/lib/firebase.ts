
import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp;
let auth: Auth;

// A more robust check to ensure config values are not undefined or placeholders
const isConfigValueValid = (value: string | undefined): value is string => {
  return value !== undefined && value !== '' && !value.startsWith('<your-');
};

// Check that all required Firebase config values are present and are not just placeholders.
const isFirebaseConfigured =
  isConfigValueValid(firebaseConfig.apiKey) &&
  isConfigValueValid(firebaseConfig.authDomain) &&
  isConfigValueValid(firebaseConfig.projectId) &&
  isConfigValueValid(firebaseConfig.storageBucket) &&
  isConfigValueValid(firebaseConfig.messagingSenderId) &&
  isConfigValueValid(firebaseConfig.appId);

if (isFirebaseConfigured) {
    try {
        app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
        auth = getAuth(app);
    } catch (e) {
        console.error("Failed to initialize Firebase", e);
    }
} else {
    console.warn("Firebase credentials are not set or are incomplete in .env. Authentication will be disabled.");
}

export { app, auth, isFirebaseConfigured };
