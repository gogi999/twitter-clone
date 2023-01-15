import express from 'express';

import {
  createTweet,
  deleteTweet,
  getAllTweets,
  likeOrDislikeTweet,
} from '../controllers/tweet.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, createTweet);
router.delete('/:id', verifyToken, deleteTweet);
router.put('/:id/like', likeOrDislikeTweet);
router.get('/timeline/:id', getAllTweets);

export default router;
