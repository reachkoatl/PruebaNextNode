const express = require('express');
const { Task } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
  const tasks = await Task.findAll({ where: { userId: req.user.id } });
  res.json(tasks);
});

router.post('/', async (req, res) => {
  const { title, description, dueDate, status } = req.body;
  const task = await Task.create({ title, description, dueDate, status, userId: req.user.id });
  res.json(task);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, dueDate, status } = req.body;
    const task = await Task.findOne({ where: { id, userId: req.user.id } });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    task.title = title;
    task.description = description;
    task.dueDate = dueDate;
    task.status = status;
    await task.save();
    res.json(task);
  });
  
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findOne({ where: { id, userId: req.user.id } });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    await task.destroy();
    res.json({ message: 'Task deleted' });
  });
  
  module.exports = router;