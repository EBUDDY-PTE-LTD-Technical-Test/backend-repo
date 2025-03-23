import * as admin from "firebase-admin";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const serviceAccountPath = path.resolve(__dirname, "../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
});

const db = admin.firestore();

export { admin, db };
