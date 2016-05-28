angular.module('MovieList').controller('MainController', [ 'User', 'GetMovieList', '$scope', function(User, GetMovieList,$scope){
    this.movieList=[];
    var store = this;
    GetMovieList.fromDb(User.id).then(function(data){
                store.movieList = data;
                store.movieList.forEach(function(movie) {
                    movie.added = true;
                }, this);
            });
}])