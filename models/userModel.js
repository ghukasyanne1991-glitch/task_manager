import db from '../clients/db.mysql.js';

export async function createUser({ id, username, email, hashedPassword }) {
    await db.execute(
        'INSERT INTO users (id, username, email, password) VALUES (?,?,?,?)',
        [id, username, email, hashedPassword]
    );
}

export async function findUserByEmail(email) {
    const [rows] = await db.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
    );
    return rows[0] || null;
}

export async function checkUsernameExists(username) {
    const [rows] = await db.execute(
        'SELECT id FROM users WHERE username = ?',
        [username]
    );
    return rows.length > 0;
}

export async function checkEmailExists(email) {
    const [rows] = await db.execute(
        'SELECT id FROM users WHERE email = ?',
        [email]
    );
    return rows.length > 0;
}