import { verifyToken } from '../utils/tokenUtils.js';

export default function auth(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token)
        return res.status(401).json({ error: 'Token required' });

    const decoded = verifyToken(token);
    if (!decoded)
        return res.status(401).json({ error: 'Invalid or expired token' });

    req.user = decoded;
    next();
}