// function validateGetUserInput(req, res, next) {
//     const { name } = req.query;

//     if (name === undefined || typeof name !== 'string' || name.trim() === '') {
//         return res.status(400).json({ error: 'Invalid input: Name parameter is required and must be a non-empty string' });
//     }

//     next();
// }

function validateUpdateUserInput(req, res, next) {
    const users = req.body;

    if (!Array.isArray(users) || users.length === 0) {
        return res.status(400).json({ error: 'Invalid input: Request body must be a non-empty array of user objects' });
    }

    next();
}

module.exports = {
    // validateGetUserInput,
    validateUpdateUserInput,
};
