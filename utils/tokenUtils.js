import crypto from 'crypto';

const algorithm = 'aes-256-cbc';

const secretKey = Buffer.from(process.env.AES_SECRET_KEY, 'utf8');
const iv = Buffer.from(process.env.AES_IV, 'utf8');

if (secretKey.length !== 32) {
    throw new Error('AES_SECRET_KEY must be 32 bytes');
}

if (iv.length !== 16) {
    throw new Error('AES_IV must be 16 bytes');
}


export function generateToken(payload) {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    const data = JSON.stringify({
        ...payload,
        timestamp: Date.now(),
    });

    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
}


export function verifyToken(token) {
    try {
        const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);

        let decrypted = decipher.update(token, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        const payload = JSON.parse(decrypted);

        const expiry =
            Number(process.env.TOKEN_EXPIRY_HOURS) * 60 * 60 * 1000;

        if (Date.now() - payload.timestamp > expiry) {
            return null;
        }

        return payload;
    } catch (err) {
        return null;
    }
}