var request = require('supertest');
var app = require('./app.js');

describe('Requests to the root path', function(){
    it('Returns a 200 status code', function(done){
       request(app)
        .get('/')
        .expect(200, done)
    });
    
    it('Returns HTML with Movie List in it', function(done){
       request(app)
        .get('/')
        .expect('Content-Type',/html/, done)
    });
});

describe('GET movie requests by Title', function(){
    it('Returns a json', function(done){
       request(app)
        .get('/search/title/Star+Wars')
        .expect(200)
        .expect('Content-Type', /json/, done)
    });
    
    it('Returns a movie results', function(done){
       request(app)
        .get('/search/title/Star+Wars')
        .expect(/Star Wars/i,done)
    });
    
    it('Returns data is empty message', function(done){
       request(app)
        .get('/search/title/nosuchid')
        .expect(/data is empty/i,done)
    });
    
});


describe('GET full movie info by id', function(){
    it('Returns a json', function(done){
       request(app)
        .get('/search/id/140607')
        .expect(200)
        .expect('Content-Type', /json/, done)
    });
    
    it('Returns a full movie results', function(done){
       request(app)
        .get('/search/id/140607')
        .expect(/genres/i)
        .expect(/imdb_id/i)
        .expect(/cast/i)
        .expect(/director/i,done)
    });
    
    it('Returns data is empty message', function(done){
       request(app)
        .get('/search/id/nosuchid')
        .expect(/The resource you requested could not be found/i,done)
    });
    
});