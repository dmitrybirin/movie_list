angular.module('MovieList')
.factory('GetMovieList', ['$http', function GetMovieListFactory($http){
    var serverPath = 'http://localhost:8000';

    return {
        byTitle: function(title){
            var movie_data = []
            return $http.get(serverPath + "/search/title/" + title)
                .then(function(response){
                        return response.data.movie_data;
                    },
                    function (httpError) {    
                        return httpError.data;
                    })
            },
        fromDb: function(user_id){
            var movie_data = []
            return $http.get(serverPath + "/getList/id/" + user_id)
                .then(function(response){
                    if (!response.data.error)
                    {
                        movie_data = response.data.movie_data;
                    }
                        return movie_data;
                    },
                    function (httpError) {
                            console.log(httpError.status + " : " + httpError.data);
                            return httpError.data;
                    })
            }  
        }
}]);