const http = require('http');
const userController = require('./controllers/users.c');
const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 9000;

// app.use(cors({
//     origin: 'http://localhost:3000'
// }));

// Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', userController.getUser);
app.post('/update', userController.updateUser);

// Create HTTP server
const server = http.createServer(app);

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});