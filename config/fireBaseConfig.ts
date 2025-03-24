import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "../serviceAccountKey.json";

console.log("Initializing Firestore...");
const app = initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

const db = getFirestore();
console.log("Firestore initialized:", db !== undefined);

export { db };
