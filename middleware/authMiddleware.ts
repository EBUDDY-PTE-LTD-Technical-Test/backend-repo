import { Request, Response, NextFunction } from 'express';
import { admin } from '../config/fireBaseConfig';


export interface AuthenticatedRequest extends Request {
  user?: {
    uid: string;
    email?: string;
  }
}

export const authMiddleware = async (
  req: AuthenticatedRequest, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'Unauthorized: Missing or Invalid token format' 
      });
    }
    
    const token = authHeader.split('Bearer ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        error: 'Unauthorized: Missing token' 
      });
    }
    
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = {
        uid: decodedToken.uid,
        email: decodedToken.email
      };
      
      next();
    } catch (error) {
      console.error('Error verifying token:', error);
      return res.status(403).json({ 
        error: 'Forbidden: Invalid token' 
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
};