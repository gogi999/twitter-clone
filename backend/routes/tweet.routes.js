import express from 'express';

import {
  createTweet,
  deleteTweet,
  getAllTweets,
  getExploreTweets,
  getUserTweets,
  likeOrDislikeTweet,
} from '../controllers/tweet.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, createTweet);
router.delete('/:id', verifyToken, deleteTweet);
router.put('/:id/like', likeOrDislikeTweet);
router.get('/timeline/:id', getAllTweets);
router.get('/user/all/:id', getUserTweets);
router.get('/explore', getExploreTweets);

export default router;
