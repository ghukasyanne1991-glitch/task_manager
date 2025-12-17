import { v4 as uuidv4 } from 'uuid';
import * as userModel from '../models/userModel.js';
import { hashPassword, comparePassword } from '../utils/passwordUtils.js';
import { generateToken } from '../utils/tokenUtils.js';
import * as validate from '../utils/validate.js';

export async function register(req, res) {
    const { username, email, password } = req.body;

    if (!validate.validateUsername(username).valid)
        return res.status(400).json({ error: 'Invalid username' });

    if (!validate.validateEmail(email).valid)
        return res.status(400).json({ error: 'Invalid email' });

    if (!validate.validatePassword(password).valid)
        return res.status(400).json({ error: 'Invalid password' });

    if (await userModel.checkUsernameExists(username))
        return res.status(400).json({ error: 'Username exists' });

    if (await userModel.checkEmailExists(email))
        return res.status(400).json({ error: 'Email exists' });

    const hashedPassword = await hashPassword(password);

    const id = uuidv4();
    await userModel.createUser({ id, username, email, hashedPassword });

    res.status(201).json({ message: 'User created', userId: id });
}

export async function login(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findUserByEmail(email);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await comparePassword(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = generateToken({ userId: user.id });

    res.json({ token });
}