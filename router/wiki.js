'use strict';
var express = require('express');
var router = express.Router();
module.exports=router;
var models = require('../models');
var Page = models.Page; 
var User = models.User; 
router.get('/', function(req,res,next)
 {
// Page.findAll().then((page)=> page.forEach(function(element) {
//    // console.log(element.urlTitle);
//    //res.render(element.urlTitle);
//   //console.log("type========"+typeof( element.urlTitle));
//   if(typeof(element.urlTitle)=="string")
//     //res.render(element.urlTitle);
//   res.render('index',{
//         page:page
//     });
// }));

//res.send("hi");

Page.findAll()
.then(function(page)
{
   res.render('index',{
        page:page
    });
})

});

// saves new page info to the db
router.post('/',function(req,res,next)
{
//res.json(req.body); // prints the respons as json obj : {"title":"first title"} in the browser 
User.findOrCreate({where :{name: req.body.name, email: req.body.email}})
.then(function(arr)
{
    var user=arr[0];
var page = Page.build(req.body);
 page.save().then(function(newpage)
{
    //res.redirect(newpage.route);
   return  newpage.setAuthor(user);
})
.then(function(page)
{
   res.redirect(page.route); 
})

})


// var page = Page.build(req.body);
// console.log("body===>"+req.body.name);

//   // STUDENT ASSIGNMENT:
//   // make sure we only redirect *after* our save is complete!
//   // note: `.save` returns a promise or it can take a callback.
  
//   page.save().then(function(newpage)
// {
//     //var route=newpage.get('urlTitle');
//     //console.log("ROUTE"+newpage.route);


//     res.redirect(newpage.route);
// })

//page.setAuthor(User.name);





  

})

router.get('/add',function(req,res)
{
    res.render('addpage');
})

router.get('/:urlTitle', function (req, res, next) {
  //res.send('hit dynamic route at ' + req.params.urlTitle);

 // Page.urlTitle="index";
  

  Page.findOne({
      where:{
          urlTitle:req.params.urlTitle
      }
  })
    .then(function(page)
{
    //res.json(page);
    res.render('wikipage',{
        page:page
    });  // renders the wikipage 
})
.catch(next);

})
