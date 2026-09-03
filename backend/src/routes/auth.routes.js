import express from 'express';
import { login, register } from '../controllers/auth.controller.js';
import rateLimiter from '../middleware/rateLimiter.middleware.js';

const router = express.Router();

router.post('/login', rateLimiter, login);
router.post('/register', rateLimiter, register);

export default router;