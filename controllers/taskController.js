import { v4 as uuidv4 } from 'uuid';
import * as taskModel from '../models/taskModel.js';
import * as validate from '../utils/validate.js';

export async function createTask(req, res) {
    const { title, description, taskDate } = req.body;
    const userId = req.user.userId;

    if (!validate.validateTitle(title).valid)
        return res.status(400).json({ error: 'Invalid title' });

    if (!validate.validateDate(taskDate).valid)
        return res.status(400).json({ error: 'Invalid date' });

    const count = await taskModel.getTaskCountByDateAndUser(taskDate, userId);
    if (count >= 3)
        return res.status(400).json({ error: 'Max 3 tasks per day' });

    const task = await taskModel.createTask({
        id: uuidv4(),
        userId,
        title,
        description,
        taskDate,
        completed: false
    });

    res.status(201).json({ task });
}

export async function getAllTasks(req, res) {
    const userId = req.user.userId;
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    const tasks = await taskModel.getAllTasksByUser(userId, limit, offset);
    const total = await taskModel.getTotalTasksCountByUser(userId);

    res.json({ tasks, total });
}

export async function getTaskById(req, res) {
    const userId = req.user.userId;
    const { id } = req.params;

    const task = await taskModel.getTaskById(id, userId);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    res.json({ task });
}

export async function updateTask(req, res) {
    const userId = req.user.userId;
    const { id } = req.params;
    const { title, description, taskDate, completed } = req.body;

    if (!validate.validateTitle(title).valid)
        return res.status(400).json({ error: 'Invalid title' });

    if (!validate.validateDate(taskDate).valid)
        return res.status(400).json({ error: 'Invalid date' });

    const updatedTask = await taskModel.updateTask(id, userId, {
        title,
        description,
        taskDate,
        completed: !!completed,
    });

    if (!updatedTask) return res.status(404).json({ error: 'Task not found' });

    res.json({ task: updatedTask });
}

export async function deleteTask(req, res) {
    const userId = req.user.userId;
    const { id } = req.params;

    const deleted = await taskModel.deleteTask(id, userId);
    if (!deleted) return res.status(404).json({ error: 'Task not found' });

    res.json({ message: 'Task deleted' });
}