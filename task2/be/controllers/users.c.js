const userModel = require('../models/users.m');

async function getUser(req, res) {
    try {
        const users = await userModel.getAllUsers();
        console.log(users);
        res.json(users);
    } catch (error) {
        console.error("Error getting users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    getUser
};