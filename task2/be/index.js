const http = require('http');
const userController = require('./controllers/users.c');
const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 9000;
const errorHandler = require('./middlewares/errorHandle')
const authenticate = require('./middlewares/authenticate');
const { validateGetUserInput, validateUpdateUserInput } = require('./middlewares/inputValidate');
require('dotenv').config()
app.use(cors({
    origin: process.env.REACT_URL,
}));

// app.use(cors({
//     origin: 'http://localhost:3000'
// }));

// Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler.errorHandler);

// Routes
app.get('/', authenticate.authenticate, userController.getUser);
app.post('/update', authenticate.authenticate, validateUpdateUserInput, userController.updateUser);

// Create HTTP server
const server = http.createServer(app);

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});