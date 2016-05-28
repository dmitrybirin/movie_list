angular.module('MovieList')
.factory('GetPoster', ['$http', function GetPosterFactory($http){
    var PosterUrl = "http://image.tmdb.org/t/p/w185";
    var notFoundPath = '/notfound.jpg'
    return {
        checkPoster: function(movie){
            var fullPath = PosterUrl + movie.posterPartUrl;
            return $http.get(fullPath)
                .then(function(response){
                    if (response.status==200) return fullPath;
                    else return notFoundPath;
                },
                    function (httpError) {
                       return notFoundPath;
                    })
             }
    }}
]);
