const express = require('express');
const userController = require('./controllers/users.c')
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors({
    origin: 'http://localhost:3000'
}));

// Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', userController.getUser);
app.post('/update', userController.updateUser);


// Start the server
app.listen(PORT, () => {
    console.log(`http://localhost:9000`);
});