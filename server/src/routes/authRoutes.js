import express from 'express';
import { register, login } from '../controllers/authController.js';
import { registerSchema, loginSchema, validateRequest } from '../middleware/validator.js';

const router = express.Router();

router.post('/register', validateRequest(registerSchema), register);
router.post('/login', validateRequest(loginSchema), login);

export default router;
