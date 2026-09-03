const express = require('express');
const db = require('../config/database');

const router = express.Router();

// Get questions by category and difficulty
router.get('/', async (req, res) => {
  try {
    const { category, difficulty, limit = 10 } = req.query;

    let query = 'SELECT q.id, q.text, q.category_id, q.difficulty, a.text as answer, a.is_correct, q.explanation FROM questions q JOIN answers a ON q.id = a.question_id WHERE 1=1';
    const params = [];
    let paramCount = 1;

    if (category) {
      query += ` AND q.category_id = $${paramCount}`;
      params.push(category);
      paramCount += 1;
    }

    if (difficulty) {
      query += ` AND q.difficulty = $${paramCount}`;
      params.push(difficulty);
      paramCount += 1;
    }

    query += ` LIMIT $${paramCount}`;
    params.push(limit);

    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
