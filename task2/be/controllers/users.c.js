const userModel = require('../models/users.m');

async function getUser(req, res) {
    try {
        const {name} = req.query;
        const users = await userModel.getAllUsers();
        
        const filteredUsersbyName = users.filter(user => {
            return user.username.includes(name) || user.email.includes(name);
        });
        
        console.log(name)
        if (name !== undefined)
            res.json(filteredUsersbyName);
        else
            res.json(users)
    } catch (error) {
        console.error("Error getting users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function updateUser(req, res) {
    try {
        const users = req.body
        const userUpdate = await userModel.updateAllUser(users);
        res.json({ message: "Records updated successfully", userUpdate });
    } catch (error) {
        console.error("Error updating users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    getUser, 
    updateUser
};