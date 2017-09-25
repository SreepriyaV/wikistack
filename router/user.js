'use strict';
var express = require('express');
var router = express.Router();
module.exports=router;
var models = require('../models');
var User = models.User; 
router.get('/', function(req,res,next)
 {
//res.redirect('/');
User.findAll({}).then(function(users){
    res.render('users', { users: users });
  }).catch(next);


});
 router.get('/:userId',function(req,res)
{
   // res.render('addpage');

   var userPromise = User.findById(req.params.userId);
   console.log("userpromise=====>"+ userPromise);
   res.json("hi");
});

router.post('/:userId',function(req,res,next)
{

})

router.put('/:userId',function(req,res,next)
{

})

router.delete('/',function(req,res,next)
{

})



