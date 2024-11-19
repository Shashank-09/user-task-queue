const express = require('express');
const { addTaskToQueue } = require('../queue');
const router = express.Router();

router.post('/', async (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: 'user_id is required' });
  }

  try {
    await addTaskToQueue(user_id);
    res.status(200).json({ message: 'Task queued successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to queue the task.' });
  }
});

module.exports = router;
