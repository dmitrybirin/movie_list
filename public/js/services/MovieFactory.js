angular.module('MovieList')
.factory('Movie', ['$http', '$timeout', function MovieFactory($http, $timeout){
    var serverPath = 'http://localhost:8000';
    var posterSource = 'http://image.tmdb.org/t/p/w185';

    return {
        getById: function(id){
                return $http.get(serverPath + "/search/id/" + id)
                    .then(function(response){
                        var data = {}
                        if (!response.data.error)
                        {
                            data = response.data.movie_data;
                        }
                        return data;
                    },
                    function (httpError) {
                            console.log(httpError.status + " : " + httpError.data);
                            return data;
                    })
        },
        addToDbList: function(user_id,movie){
            return $http.put(serverPath + "/list/update/id/" + user_id, movie)
                .then(function(response){
                    if (!response.data.error)
                    {
                        console.log("DB OK");
                    }
                    else{
                        console.log("DB NOT OK");
                    }
                    },
                    function (httpError) {
                            console.log(httpError.status + " : " + httpError.data);
                    })
            },
        deleteFromList:  function(user_id,imdb_id){
            return $http.put(serverPath + "/list/delete/id/" + user_id, {imdb_id:imdb_id})
                .then(function(response){
                    if (!response.data.error)
                    {
                        console.log("DB OK");
                    }
                    else{
                        console.log("DB NOT OK");
                    }
                    },
                    function (httpError) {
                            console.log(httpError.status + " : " + httpError.data);
                    })
            }
    }
}]);