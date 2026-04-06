const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const movieModel = require('./movie-model.js');

const app = express();

// Parse urlencoded bodies
app.use(bodyParser.json()); 

// Serve static content in directory 'files'
app.use(express.static(path.join(__dirname, 'files')));

// Configure a 'get' endpoint for all movies..
app.get('/movies', function (req, res) {
  const moviesArray = Object.values(movieModel);
  res.json(moviesArray);
})

// Configure a 'get' endpoint for a specific movie
app.get('/movies/:imdbID', function (req, res) {
  const reqeustId = req.params.imdbID;
  const movie = movieModel[reqeustId];

  if (movie) {
    res.json(movie);
  } else {
    res.sendStatus(404);
  }
})

app.put('/movies/:imdbID', function(req, res) {
  const requestId = req.params.imdbID;
  const updateMovieData = req.body;

  if (movieModel[requestId]) {
    movieModel[requestId] = updateMovieData;
    res.sendStatus(200);
  } else {
    movieModel[requestId] = updateMovieData;
    res.status(201).json(updateMovieData);
  }
});

app.listen(3000)

console.log("Server now listening on http://localhost:3000/")

