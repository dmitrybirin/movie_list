'use strict'
var movie = require('../models/movie');
var httpConsts = require('../httpConsts');

exports.tmdbResponseHandler = function (err, tmdbResponse, body, res, dataType) {

    if (responseErrorHandler(err, tmdbResponse, res))
        console.log("I'm getting Title in responseCtrl");
        movie.getData(body, dataType, function(err, data){
            res.status(200).json({
            error: err ? err : null,
            movie_data: err ? null: data
            });
        });
};

var responseErrorHandler = function(err, tmdbResponse, res){
    
    if (!tmdbResponse) {
         res.status(500)
        .json({err: {message: httpConsts.connectionIssueMessage}, data: null});
        return false;
    }

    if  (!tmdbResponse.headers['content-type'].includes('application/json')){
        
        res.status(503)
        .json({err: {message: httpConsts.wrongResponseFormatMessage}, data: null});
        return false;
    }

    if (tmdbResponse.statusCode == 401) 
    {
        res.status(401)
        .json({err: {message: httpConsts.unAuthMessage}, data: null});
        return false;
    }

    if (err) {
        if (err.code == 'ENOTFOUND' && err.syscall == 'getaddrinfo') 
        {
            res.status(500)
            .json({err: {message: httpConsts.connectionIssueMessage}, data: null});
        }
        else
        { 
            res.status(503)
            .json({err: err, data: null});
        }
        return false;
    }
}

