import express from 'express';
import { login, logout, refreshToken } from '../controllers/AuthController.js';

const router = express.Router();

router.post('/api/login', login);
router.delete('/api/logout', logout);
router.get('/api/token', refreshToken);

export default router;
