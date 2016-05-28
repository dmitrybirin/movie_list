angular.module('MovieList')
.directive('reviewForm', function(){
    return {
        restrict: 'E',
        templateUrl: 'partials/review-form.html',
        controller: ['Movie', function(Movie){
            this.showForm=false;
            var unknownMovie = {
                title: "Unknown Title",
                director: "Unknown Director",
                review: "No Review Yet",
                cast: ["Unknown cast"],
                genres:{}
                };
            this.movie = {};
            var store = this; 
            this.getPoster = function(imdb_id){
                this.movie.posterLoading = true;
                Movie.getByImdb(imdb_id)
                .then(function(data){
                    store.movie.posterLoading = false;                    
                    store.movie.posterPath = data.posterPath;
                });
            }
            this.saveReview = function(form){
                for (var key in unknownMovie) {
                    if (!this.movie.hasOwnProperty(key)) {
                        console.log('prop is undefined: ' + unknownMovie[key])
                        this.movie[key] = unknownMovie[key];
                    }
                }
                movies.push(this.movie);
                this.movie = {};
                form.$setPristine();
            };
            
            }],
        controllerAs: 'reviewFormCtrl',
        scope: {
            movies: '=',
            genres: '='
        }
    }
});