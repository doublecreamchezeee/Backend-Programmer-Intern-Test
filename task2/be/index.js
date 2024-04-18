const express = require('express');
const userController = require('./controllers/users.c')
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', userController.getUser);

// Start the server
app.listen(PORT, () => {
    console.log(`http://localhost:3000`);
});