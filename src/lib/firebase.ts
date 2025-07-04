import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

// Check if the API key is present and not a placeholder.
const firebaseEnabled = !!firebaseConfig.apiKey && !firebaseConfig.apiKey.includes("YOUR_API_KEY");

if (firebaseEnabled) {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
} else {
    // This warning is helpful for developers to know that Firebase is not configured.
    console.warn("ACCIÓN REQUERIDA: Las credenciales de Firebase no están configuradas en el archivo .env. Las funciones de autenticación estarán deshabilitadas.");
}

export { app, auth, firebaseEnabled };
