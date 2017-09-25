'use strict';
var express = require('express');
var app = express();
var morgan = require('morgan');
var nunjucks = require('nunjucks');
var pg=require('pg')

var fs = require('fs');
var path = require('path');

var bodyParser = require('body-parser');

var models= require('./models');
const wikiRouter = require('./router/wiki.js');
const userRouter = require('./router/user.js');


app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
nunjucks.configure('views', { noCache: true }); // where to find the views, caching off

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests


// start the server



app.use(express.static(path.join(__dirname, '/public')));

// modular routing that uses io inside it
app.get('/', function(req,res)
{
  res.render('index.html');
});
//models.db.sync({force: true});
app.use('/wiki', wikiRouter );
app.use('/users', userRouter );



models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function () {
    // make sure to replace the name below with your express app
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error);