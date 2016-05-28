'use strict'
var request = require('request');
var resHandler = require('./responseController');
var config = require('../config');

//the App is powered by TMDB API https://www.themoviedb.org/documentation/api
var apiKey = config.API_KEY || 'unauthorized';

exports.getByImdb = function(req,res,next) {
    request.get({
        url: `https://api.themoviedb.org/3/find/${req.params.imdb_id}`,
        qs:
        {
            external_source: 'imdb_id', 
            api_key:apiKey
        }
    }, 
    (err, tmdbResponse, body)=> resHandler.tmdbResponseHandler(err, tmdbResponse, body, res, 'details'));
};

exports.getByTitle = function(req,res,next) {
    request.get({
        url: `http://api.themoviedb.org/3/search/movie`,
        qs:
        {
            query: req.params.title, 
            api_key:apiKey
        }
    },
    (err, tmdbResponse, body)=> resHandler.tmdbResponseHandler(err, tmdbResponse, body, res, 'list'));
};

exports.getFullInfoById = function(req,res,next) {
    request.get({
        url: `http://api.themoviedb.org/3/movie/${req.params.id}`,
        qs:
        {
            api_key:apiKey,
            append_to_response: "credits"
        }
    },
    (err, tmdbResponse, body)=> resHandler.tmdbResponseHandler(err, tmdbResponse, body, res, 'details'));
};