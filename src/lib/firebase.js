import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChl9PcDzgqOT4drc801rbHtfXJXQ8_aKk",
  authDomain: "advertex-df37c.firebaseapp.com",
  projectId: "advertex-df37c",
  storageBucket: "advertex-df37c.firebasestorage.app",
  messagingSenderId: "149085164159",
  appId: "1:149085164159:web:43a7cc2e37067d36e3254a",
  measurementId: "G-DEN8F2R4YS"
};

export const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const db = getFirestore(app);
