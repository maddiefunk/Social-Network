import { Router } from 'express';
const router = Router();
import userRoutes from './userRoutes.js';
import thoughtRoutes from './thoughtRoutes.js';
router.use('/thought', thoughtRoutes);
router.use('/users', userRoutes);
export default router;
