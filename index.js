var path = require('path');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var tmdbController = require('./controllers/tmdbController');
var dbController = require('./controllers/dbController');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

var port = 8000;

app.get('/',function(req,res){
    res.sendFile('public/index.html');
});

app.get('/search/imdbid/:imdb_id', tmdbController.getByImdb);

app.get('/search/title/:title', tmdbController.getByTitle);

app.get('/search/id/:id', tmdbController.getFullInfoById);

app.get('/getlist/id/:user_id', dbController.getListByUser);

app.put('/list/update/id/:user_id', dbController.addMovieToList);

app.put('/list/delete/id/:user_id', dbController.deleteMovieFromList);

module.exports = app;