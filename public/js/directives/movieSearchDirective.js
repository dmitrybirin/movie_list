'use strict'
angular.module('MovieList')
.directive('movieSearch', function(){
    return {
        restrict: 'E',
        templateUrl: 'partials/movie-search.html',
        controllerAs: 'movieSearchCtrl',
        controller: ['$scope','$sce', 'GetMovieList', 'Movie', function($scope, $sce, GetMovieList, Movie){
            this.searchtitle="";
            this.showOverlay = false;
            this.showError = false;
            this.limitToShow = 3;
            
            var store = this; 
            this.limitToShowInc = function(){
                store.limitToShow+=3;
                if (store.limitToShow>=store.searchResults.length) {
                    store.showMoreButton = false;
                }
            }
                       
            this.onSubmit = function(title){
            store.searchResults = [];
            store.showError = false;
            
            GetMovieList.byTitle(title)
            .then(function(data){
                store.loading=true;    
                if (!data.err) {
                    for (let movieDataItem of data) {
                        store.searchResults.push(movieDataItem);    
                    }
                    for (let movie of store.searchResults) {
                        if (movie.id) Movie.getById(movie.id).then(function(movieResponseData){
                            if (movieResponseData){
                                angular.merge(movie,movieResponseData)
                            } 
                        });
                    }
                }
                else
                {
                    store.showError = true;
                    store.errorMessage = $sce.trustAsHtml(data.err.message);
                }
                store.loading=false;
                if (store.searchResults.length>3) {
                    store.showMoreButton = true;
                }    
              });
            }
        }]
    }
});