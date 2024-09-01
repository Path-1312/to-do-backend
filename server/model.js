const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dueDate: { type: Date },
    completed: { type: Boolean, default: false },
    reminder: { type: Boolean, default: false },
  },
  { timestamp: true }
);

const Task = mongoose.model('task', taskSchema);

module.exports = Task;
