
import { db } from "../config/fireBaseConfig";
import { User } from "../entities/user";

export const userCollection = {
  getUserById: async (id: string): Promise<User | null> => {
    const userDoc = await db.collection("USERS").doc(id).get();
    return userDoc.exists ? (userDoc.data() as User) : null;
  },

  updateUser: async (id: string, userData: Partial<User>): Promise<void> => {
    await db.collection("USERS").doc(id).update({
      ...userData,
      updatedAt: new Date(),
    });
  },
};
