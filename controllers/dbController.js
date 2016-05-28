var movie = require('../models/movie');

exports.getListByUser = function(req,res,next){
    movie.getListFromDb(req.params.user_id,function(err,data){
        if (err) res.status(503).json({err:err,movie_data:null});
        else res.status(200).json({err:null,movie_data:data});
    });
}

exports.addMovieToList = function(req,res,next){
    movie.addMovieToList(req.params.user_id,req.body,function(err,data){
        if (err) res.status(503).json({err:err});
        else res.status(200).json({err:null});
    });
} 

exports.deleteMovieFromList = function(req,res,next){
    movie.deleteMovieFromList(req.params.user_id,req.body,function(err,data){
        if (err) res.status(503).json({err:err});
        else res.status(200).json({err:null});
    });
} 

