import express from 'express';

import {
  deleteUser,
  follow,
  getUser,
  updateUser,
} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/find/:id', getUser);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);
router.put('/follow/:id', verifyToken, follow);

export default router;
