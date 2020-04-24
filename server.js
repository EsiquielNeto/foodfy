const express = require('express');
const nunjucks = require('nunjucks');
const data = require('./data');

const server = express();

server.use(express.static('public'));
server.set('view engine', 'njk');

nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true,
});

server.get('/', function(req, res) {
    res.render('index', { recipes: data })
});

server.get('/about', function(req, res) {
    res.render('about');
});

server.get('/recipes', function(req, res) {
    res.render('recipes', { recipes: data })
});

server.get('/recipes/:index', function(req, res) {
    const index = req.params.index;
    const recipe = data[index];

    res.render('recipe-detail', { recipe });
});

server.listen(5000, function() {
    console.log('server is running');
})