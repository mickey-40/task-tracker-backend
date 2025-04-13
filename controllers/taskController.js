import Task from '../models/Task.js';

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;

    const newTask = new Task({
      user: req.user._id,  
      title,
      description,
      dueDate,
      priority
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// Get all tasks with optional filters, sorting, and pagination
export const getTasks = async (req, res) => {
  try {
    const { completed, priority, sortBy, order, page = 1, limit = 10 } = req.query;

    let filter = { user: req.user._id }; // <--- Only logged-in user's tasks

    if (completed !== undefined) {
      filter.completed = completed === 'true';
    }

    if (priority) {
      filter.priority = priority;
    }

    let sort = {};

    if (sortBy) {
      sort[sortBy] = order === 'desc' ? -1 : 1;
    }

    const skip = (page - 1) * limit;

    const tasks = await Task.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



// Delete a task by ID
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if the logged-in user owns the task
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await task.deleteOne();
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// Update a task by ID
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if the logged-in user owns the task
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



