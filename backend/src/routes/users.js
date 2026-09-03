const express = require('express');
const db = require('../config/database');

const router = express.Router();

// Get user profile
router.get('/:userId', async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, username, email, level, xp, total_games, wins, best_category, streak
       FROM users WHERE id = $1`,
      [req.params.userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user stats
router.get('/:userId/stats', async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, username, level, xp, total_games, wins,
              ROUND(CAST(wins AS FLOAT) / NULLIF(total_games, 0) * 100, 2) as win_rate,
              best_category, streak
       FROM users WHERE id = $1`,
      [req.params.userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
