import { Router,Request,Response,NextFunction } from 'express';
import { updateUserData,fetchUserData } from '../controller/api';


const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
const router = Router();

// Apply authentication middleware to all routes


// Routes
router.post('/update-user-data', asyncHandler(updateUserData));
router.get('/fetch-user-data', asyncHandler(fetchUserData));

export default router;