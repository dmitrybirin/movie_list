angular.module('MovieList')
.directive('movieCard', function(){
    return {
        restrict: 'E',
        templateUrl: 'partials/movie-card.html',
        scope: {
            movie: '='
        },
        controllerAs: 'cardCtrl',
        controller: ['$scope','Movie','User', function($scope,Movie,User){ 
            this.addToList = function(movie){
                Movie.addToDbList(User.id,movie);
            }
            
            this.deleteFromList = function(imdb_id){
                Movie.deleteFromList(User.id,imdb_id);
            }
        }]
    }
});