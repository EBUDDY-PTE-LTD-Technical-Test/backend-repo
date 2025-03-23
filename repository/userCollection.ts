import { db } from '../config/fireBaseConfig';
import { User } from '../entities/user';

const COLLECTION_NAME = 'USERS';
const usersCollection = db.collection(COLLECTION_NAME);

export const saveUser = async (user: User): Promise<User> => {
  const now = new Date();
  
  if (user.id) {
    // Update existing user
    const userData = {
      ...user,
      updatedAt: now
    };
    
    await usersCollection.doc(user.id).update(userData);
    return userData;
  } else {
    // Create new user
    const userData = {
      ...user,
      createdAt: now,
      updatedAt: now
    };
    
    const docRef = await usersCollection.add(userData);
    return { ...userData, id: docRef.id };
  }
};

export const getUserById = async (id: string): Promise<User | null> => {
  const docRef = await usersCollection.doc(id).get();
  
  if (!docRef.exists) {
    return null;
  }
  
  return { id: docRef.id, ...docRef.data() } as User;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const snapshot = await usersCollection.where('email', '==', email).limit(1).get();
  
  if (snapshot.empty) {
    return null;
  }
  
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() } as User;
};