const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../config/database');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Start a quiz session
router.post('/start', authenticate, async (req, res) => {
  try {
    const { categoryId, difficulty } = req.body;
    const userId = req.user.userId;

    if (!categoryId || !difficulty) {
      return res.status(400).json({ error: 'Missing category or difficulty' });
    }

    // Create quiz session
    const sessionId = uuidv4();
    await db.query(
      'INSERT INTO quiz_sessions (id, user_id, category_id, difficulty, status) VALUES ($1, $2, $3, $4, $5)',
      [sessionId, userId, categoryId, difficulty, 'active'],
    );

    // Get 10 random questions
    const questions = await db.query(
      `SELECT q.id, q.text, q.explanation, q.difficulty,
              json_agg(json_build_object('id', a.id, 'text', a.text) ORDER BY a.id) as answers
       FROM questions q
       JOIN answers a ON q.id = a.question_id
       WHERE q.category_id = $1 AND q.difficulty = $2
       GROUP BY q.id
       ORDER BY RANDOM()
       LIMIT 10`,
      [categoryId, difficulty],
    );

    res.status(201).json({
      sessionId,
      questions: questions.rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit answer
router.post('/:sessionId/answer', authenticate, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { questionId, answerId, timeSpent } = req.body;

    // Verify answer
    const answer = await db.query(
      'SELECT is_correct FROM answers WHERE id = $1',
      [answerId],
    );

    if (answer.rows.length === 0) {
      return res.status(404).json({ error: 'Answer not found' });
    }

    const isCorrect = answer.rows[0].is_correct;
    let points = 0;

    if (isCorrect) {
      // Calculate points based on time (faster = more points)
      points = Math.max(10, Math.round(100 - (timeSpent / 10)));
    }

    res.json({
      isCorrect,
      points,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Complete quiz
router.post('/:sessionId/complete', authenticate, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { totalScore } = req.body;
    const userId = req.user.userId;

    // Update session status
    await db.query(
      'UPDATE quiz_sessions SET status = $1, ended_at = NOW() WHERE id = $2',
      ['completed', sessionId],
    );

    // Save quiz result
    await db.query(
      'INSERT INTO quiz_results (id, user_id, session_id, score) VALUES ($1, $2, $3, $4)',
      [uuidv4(), userId, sessionId, totalScore],
    );

    // Update user stats
    await db.query(
      `UPDATE users SET total_games = total_games + 1,
                        xp = xp + $1
       WHERE id = $2`,
      [Math.round(totalScore / 2), userId],
    );

    res.json({
      message: 'Quiz completed successfully',
      score: totalScore,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get quiz results
router.get('/:sessionId/results', authenticate, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM quiz_results WHERE session_id = $1',
      [req.params.sessionId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Results not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
