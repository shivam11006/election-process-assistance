import express from 'express';
import { getTimeline, seedData } from '../controllers/electionController.js';
const router = express.Router();

router.get('/timeline', getTimeline);
router.post('/seed', seedData);

export default router;
