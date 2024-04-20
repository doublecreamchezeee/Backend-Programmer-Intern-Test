function authenticate(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Missing token' });
    }

    try {
        if (token !== 'thanhtri'){
            return res.status(401).json({error: 'Invalid token'})
        }
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized: Authenticate fail' });
    }
}

module.exports = {
    authenticate
};

