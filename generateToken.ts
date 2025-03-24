import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

// Inisialisasi Firebase Admin SDK
import serviceAccount from "./serviceAccountKey.json"; // Pastikan file ini ada

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

// Fungsi untuk generate token pengguna
const generateToken = async (uid: string) => {
  try {
    const token = await getAuth().createCustomToken(uid);
    console.log("Generated Token:", token);
  } catch (error) {
    console.error("Error generating token:", error);
  }
};

// Ganti dengan UID user dari Firestore / Firebase Auth
generateToken("USER_ID_FIREBASE");
