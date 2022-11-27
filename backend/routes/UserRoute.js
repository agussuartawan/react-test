import express from 'express';
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from '../controllers/UserController.js';
import { verifyToken } from '../middleware/VerifyToken.js';

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.get('/users/:uuid', verifyToken, getUserById);
router.post('/users', verifyToken, createUser);
router.patch('/users/:uuid', verifyToken, updateUser);
router.delete('/users/:uuid', verifyToken, deleteUser);

export default router;
