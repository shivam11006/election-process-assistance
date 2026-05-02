import express from 'express';
import { sendMessage, getHistory, getChat, deleteChat } from '../controllers/chatController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.post('/', sendMessage);
router.get('/history', getHistory);
router.get('/:id', getChat);
router.delete('/:id', deleteChat);

export default router;
