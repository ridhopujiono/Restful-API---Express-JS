const express = require('express');
const cookieParser = require('cookie-parser');  
const app = express();

app.use(cookieParser());
app.use(express.json());

// Require the route we defined in movie.js
const movies = require('./data/movie.js');
// Require the route we defined in user.js
const users = require('./data/user.js');

// Use the route to perfix /movies
app.use('/movies', movies);
// Use the route to perfix /movies
app.use('/users/paginate', users);

// Listerning App
app.listen(3000, () => {
    console.log('Listening on port 3000');
});