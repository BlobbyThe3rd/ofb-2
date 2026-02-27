import express from 'express';
import { PrismaClient, Score } from '@prisma/client';
import { getTop10 } from '../sockets.js';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/leaderboard', async (req, res) => {
  try {
    const top10: Score[] = await getTop10();
    res.json(top10);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/scores', async (req, res) => {
  try {
    const { name, score } = req.body;

    if (!name || typeof name !== 'string' || name.length < 1 || name.length > 50) {
      return res.status(400).json({ error: 'Name must be 1-50 characters' });
    }

    if (!score || typeof score !== 'number' || score <= 0) {
      return res.status(400).json({ error: 'Score must be a positive number' });
    }

    await prisma.score.create({
      data: {
        name,
        score: Math.floor(score)
      }
    });

    const top10: Score[] = await getTop10();
    
    // Broadcast to all sockets - assuming io is available globally or passed
    if (typeof global !== 'undefined' && (global as any).io) {
      (global as any).io.emit('leaderboard_update', top10);
    }

    res.status(201).json(top10);
  } catch (error) {
    console.error('Error creating score:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;