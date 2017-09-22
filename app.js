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
