import { Request, Response } from 'express';
import { User } from '../entities/user';
import { saveUser, getUserById, getUserByEmail } from '../repository/userCollection';

export const updateUserData = async (req: Request, res: Response) => {
  try {
    console.log('Request body:', req.body); // Debug line
    
    const userData: User = req.body;
    
    // Check if userData exists
    if (!userData) {
      return res.status(400).json({ error: 'No user data provided' });
    }
    
    // Basic validation
    if (!userData.email || !userData.id) {
      return res.status(400).json({ error: 'Email and ID are required fields' });
    }
    
    // If updating an existing user, check if user exists
    const existingUser = await getUserById(userData.id);
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const savedUser = await saveUser(userData);
    return res.status(200).json(savedUser);
  } catch (error) {
    console.error('Error updating user data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
export const fetchUserData = async (req: Request, res: Response) => {
  try {
    const { id, email } = req.query;
    
    if (!id && !email) {
      return res.status(400).json({ error: 'User ID or email is required' });
    }
    
    let user = null;
    
    if (id) {
      user = await getUserById(id as string);
    } else if (email) {
      user = await getUserByEmail(email as string);
    }
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};