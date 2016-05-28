angular.module('MovieList')
.directive('poster', function(){
    return {
        restrict: 'E',
        templateUrl:'partials/poster.html',
        scope:{
            movie:"="
        },
        controllerAs: "posterCtrl",
        controller: ['GetPoster', '$scope', '$timeout', function(GetPoster, $scope, $timeout){
            var PosterUrl = "http://image.tmdb.org/t/p/w185";
            var notFoundPath = '/notfound.jpg'
            if($scope.movie){
                var partUrl = $scope.movie.posterPartUrl;
                $scope.movie.posterLoading = true;
                if (partUrl) $scope.movie.posterPath = PosterUrl + partUrl;
                else $scope.movie.posterPath = notFoundPath;
                
                $scope.movie.posterLoading = false;
            }    
        }]
    }
});