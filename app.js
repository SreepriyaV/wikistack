<<<<<<< HEAD
const express = require ('express'); //node platform used to create servers
const app = express();
const morgan = require ('morgan'); //used to log a summary of all requests and responses 

//get req line
app.get('/', function(req, res){

});

//middleware
app.use(function(req, res, next){
	//do logging here
	//call next or else your app will be a black hole
	//receives requests and not properly responding
})

//listens to my server - good practice to have listen come up at the end
app.listen(3000, function(){
	console.log('listening on port 3000')
});

=======
const express =require('express');
const app=express();
const morgan= require('morgan'); // log summary of client server comm 

//get req
app.get('/', function (req, res) {
  //res.send('Hello World!')
})

//middleware
app.use(function (req, res, next) {
    // do your logging here
    // call `next`, or else your app will be a black hole — receiving requests but never properly responding
})


//listens to my server 
app.listen(3000, function () {
  console.log(' listening on port 3000!')
})
>>>>>>> 8cbe995563aff95171a2ac8e3103853df3c93120
