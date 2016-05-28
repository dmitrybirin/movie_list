angular.module('MovieList')
.directive('movieGenres', function(){
    return {
        restrict: 'E',
        templateUrl: 'partials/movie-genres.html',
        scope: {
            genres: '='
        }
    }
});