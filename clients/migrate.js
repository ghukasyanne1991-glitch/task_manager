import dbConnection from './db.mysql.js';

(async () => {
    try {
        await dbConnection.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id        VARCHAR(36) PRIMARY KEY,
                username  VARCHAR(50) UNIQUE NOT NULL,
                email     VARCHAR(100) UNIQUE NOT NULL,
                password  VARCHAR(255) NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await dbConnection.execute(`
            CREATE TABLE IF NOT EXISTS tasks (
                id          VARCHAR(36) PRIMARY KEY,
                userId      VARCHAR(36) NOT NULL,
                title       VARCHAR(255) NOT NULL,
                description TEXT,
                completed   BOOLEAN DEFAULT FALSE,
                taskDate    DATE NOT NULL,
                createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
            )
        `);


        await dbConnection.execute(`
            INSERT INTO users (id, username, email, password)
            VALUES ([userId, 'john_doe', 'john@example.com', hashedPassword])
        `);


        await dbConnection.execute(`
            INSERT INTO tasks (id, userId, title, description, completed, taskDate)
            VALUES ([taskId, userId, 'john_doe', 'This is a demo task', false, '1999-02-02'])
        `);


    } catch (err) {
        console.error('Error:', err);
    }
})();