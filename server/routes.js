const express = require('express');
const router = express.Router();
const Task = require('./model');

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new task
router.post('/', async (req, res) => {
  const { name, dueDate, reminder } = req.body;
  try {
    const newTask = await Task.create({ name, dueDate, reminder });
    res.status(200).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a task
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const task = await Task.findOneAndUpdate(id, updates, { upsert: true });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Task.deleteOne(id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/due-today', async (req, res) => {
  const now = new Date();
  const startOfDay = new Date(now.setHours(0, 0, 0, 0));
  const endOfDay = new Date(now.setHours(23, 59, 59, 999));

  try {
    const tasks = await Task.find({
      dueDate: { $gte: startOfDay, $lte: endOfDay },
      completed: false,
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
});

module.exports = router;
