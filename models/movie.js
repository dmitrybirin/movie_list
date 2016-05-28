'use strict'
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/movie_list';

exports.getData = function(body, dataType, callback){
    switch (dataType) {
        case "list":
            getMovieList(body, callback);
            break;
        case "details":
            getMovieDetails(body, callback);
            break;
        default:
            callback(`wrong type of data passed to the model:${dataType}`, null);
            break;
    }
    
}

exports.getListFromDb = function(user_id, callback){
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected succesfully to server");
        var collection = db.collection('lists');
        collection.find({owner_id:user_id}).toArray(function(err, docs) {
            assert.equal(err, null);
            console.log(`Found the list records by user_id: "${user_id}"...`);
            callback(null, docs[0].movieList);
            db.close();
        });
    });
};

exports.addMovieToList = function(user_id, movie, callback){
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected succesfully to server");
        var collection = db.collection('lists');
        collection.update(
            {owner_id:user_id},
            { $push: { movieList: movie } })
            assert.equal(err, null);
            console.log(`movie ${movie.title} was successfully added to list of user_id "${user_id}"...`);
            callback(null);
            db.close();
    });
};

exports.deleteMovieFromList = function(user_id, payload, callback){
    console.log(payload);
    console.log(payload.imdb_id);
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected succesfully to server");
        var collection = db.collection('lists');
        collection.update(
            {owner_id:user_id},
            { $pull: { movieList: {imdb_id: payload.imdb_id} }})
            assert.equal(err, null);
            console.log(`movie with imdb_id ${payload.imdb_id} was successfully added to list of user_id "${user_id}"...`);
            callback(null);
            db.close();
    });
};



var getMovieDetails = function(body, callback) {
    var data = JSON.parse(body);
    if (data.status_code == 34) return callback(data.status_message, null);
    if (!data) return callback('there is no results', null);
    else {
        let movie = {}
        if (data.genres) {
            movie.genres = [];
            for (let orig_genre of data.genres) {
            movie.genres.push(orig_genre.name.toLowerCase())
            }    
        }
        movie.imdb_id = data.imdb_id;
        if (data.credits){
            movie.cast = data.credits.cast.slice(0,5);
            movie.director = data.credits.crew.filter((obj) => obj.job === 'Director');
        }
        callback(null, movie);
    }
};

var getMovieList = function(body, callback) {
    var data = JSON.parse(body);
    var results = data.movie_results || data.results
    if (!results) return callback('there is no results', null);
    else if (Array.isArray(results) && !(results.length)) return callback('data is empty', null);
    else if (results.status_code == 34) return callback(results.status_message, null);
    else {
        let list = [];
        for (let results_item of results){
            let movie={};
            movie.id = results_item.id;
            movie.title = results_item.original_title;
            movie.posterPartUrl = results_item.poster_path;
            list.push(movie);    
        }
        callback(null, list);   
    }
};