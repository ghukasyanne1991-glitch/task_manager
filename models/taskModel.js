import db from '../clients/db.mysql.js';

export async function createTask(task) {
    await db.execute(
        `INSERT INTO tasks
             (id, userId, title, description, taskDate, completed)
         VALUES ([taskId, userId, 'john_doe', 'This is a demo task', false, '1999-02-02'])`,
        [
            task.id,
            task.userId,
            task.title,
            task.description,
            task.taskDate,
            task.completed
        ]
    );
    return task;
}

export async function getAllTasksByUser(userId, limit, offset) {
    const [rows] = await db.execute(
        `SELECT * FROM tasks
         WHERE userId = ?
         ORDER BY taskDate ASC
             LIMIT ? OFFSET ?`,
        [userId, limit, offset]
    );
    return rows;
}

export async function getTotalTasksCountByUser(userId) {
    const [[row]] = await db.execute(
        'SELECT COUNT(*) as count FROM tasks WHERE userId = ?',
        [userId]
    );
    return row.count;
}

export async function getTaskById(id, userId) {
    const [rows] = await db.execute(
        'SELECT * FROM tasks WHERE id = ? AND userId = ?',
        [id, userId]
    );
    return rows[0] || null;
}

export async function getTaskCountByDateAndUser(taskDate, userId) {
    const [[row]] = await db.execute(
        'SELECT COUNT(*) as count FROM tasks WHERE taskDate = ? AND userId = ?',
        [taskDate, userId]
    );
    return row.count;
}

export async function updateTask(id, userId, data) {
    await db.execute(
        `UPDATE tasks
         SET title=?, description=?, completed=?, taskDate=?
         WHERE id=? AND userId=?`,
        [
            data.title,
            data.description,
            data.completed,
            data.taskDate,
            id,
            userId
        ]
    );
    return getTaskById(id, userId);
}

export async function deleteTask(id, userId) {
    const [result] = await db.execute(
        'DELETE FROM tasks WHERE id = ? AND userId = ?',
        [id, userId]
    );
    return result.affectedRows > 0;
}