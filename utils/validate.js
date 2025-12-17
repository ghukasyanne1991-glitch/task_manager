function result(valid, error) {
    return valid ? { valid } : { valid, error };
}

export const validateUsername = username =>
    /^[a-zA-Z0-9_]{3,50}$/.test(username)
        ? result(true)
        : result(false, 'Invalid username');

export const validateEmail = email =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? result(true)
        : result(false, 'Invalid email');

export const validatePassword = password =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/.test(password)
        ? result(true)
        : result(false, 'Invalid password');

export const validateTitle = title =>
    /^[\p{L}0-9\s.,!?-]{3,255}$/u.test(title)
        ? result(true)
        : result(false, 'Invalid title');

export const validateDate = date => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date))
        return result(false, 'Invalid date format');

    const inputDate = new Date(date);
    if (isNaN(inputDate.getTime()))
        return result(false, 'Invalid date');

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (inputDate < today)
        return result(false, 'Date must be today or future');

    return result(true);
};

export const validateUUID = id =>
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)
        ? result(true)
        : result(false, 'Invalid UUID');