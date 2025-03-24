import admin from "firebase-admin";
import serviceAccount from "../serviceAccountKey.json"; // Pastikan file ini ada

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    databaseURL: "https://your-project-id.firebaseio.com",
  });
}

const db = admin.firestore();
const auth = admin.auth();

export { admin, db, auth };
