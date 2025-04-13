import express from 'express';
import { createTask, getTasks, deleteTask, updateTask } from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
// POST /api/tasks → create a new task
  .post(protect, createTask)
// Get all tasks
  .get(protect, getTasks);

router.route('/:id')
// Delete a task
  .delete(protect, deleteTask)
// Update a task
  .put(protect, updateTask);



export default router;
