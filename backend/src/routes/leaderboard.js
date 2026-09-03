const express = require('express');
const db = require('../config/database');

const router = express.Router();

// Get global leaderboard
router.get('/', async (req, res) => {
  try {
    const { limit = 50, offset = 0 } = req.query;

    const result = await db.query(
      `SELECT id, username, level, xp, total_games, wins,
              ROUND(CAST(wins AS FLOAT) / NULLIF(total_games, 0) * 100, 2) as win_rate
       FROM users
       ORDER BY xp DESC, wins DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset],
    );

    const total = await db.query('SELECT COUNT(*) as count FROM users');

    res.json({
      leaderboard: result.rows,
      total: total.rows[0].count,
      limit,
      offset,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get leaderboard by category
router.get('/category/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { limit = 50, offset = 0 } = req.query;

    const result = await db.query(
      `SELECT u.id, u.username, u.level, COUNT(qr.id) as category_games,
              SUM(CASE WHEN qr.score > 50 THEN 1 ELSE 0 END) as category_wins
       FROM users u
       LEFT JOIN quiz_results qr ON u.id = qr.user_id
       LEFT JOIN quiz_sessions qs ON qr.session_id = qs.id
       WHERE qs.category_id = $1
       GROUP BY u.id
       ORDER BY category_wins DESC, category_games DESC
       LIMIT $2 OFFSET $3`,
      [categoryId, limit, offset],
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
