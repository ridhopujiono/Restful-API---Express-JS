const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cookieParser = require('cookie-parser');  
const app = express();

app.use(cookieParser());
app.use(express.json());

// Require the route we defined in movie.js
const movies = require('./data/movie.js');
// Require the route we defined in user.js
const users = require('./data/user.js');
// Require Swagger
const api_docs = require('./swagger/index.js');


// First Login
app.get('/', (req, res) => {
    const token = jwt.sign(
        {
            userID: 23,
            role: 'admin',
        },
        'rahasia'
    );
    res.json({
        message: 'Welcome to the API',
        token: token,
        env: process.env.JWT_SECRET_TOKEN
    })
})

// Use the route to perfix /movies
app.use('/movies', movies);
// Use the route to perfix /user
app.use('/users', users);

// API-DOC
app.use(api_docs);
// Listening App
app.listen(3000, () => {
    console.log('Listening on port 3000');
});