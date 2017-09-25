var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');

var Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull:false
    },
    urlTitle: {
        type: Sequelize.STRING
        
        //allowNull:false
    },
    

    content: {
        type: Sequelize.TEXT,
        allowNull:false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
       
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW //timestamp 
    },

},
{
    // creates a route that directs to /wiki/urltitle 
    getterMethods: {
    route() {
      return '/wiki/'+ this.urlTitle;
    }
    }
} );

// the argument is an object of page. so acces the properties. 
Page.beforeValidate(function generateUrlTitle (page) {
  if (page.title) {
    // Removes all non-alphanumeric characters from title
    // And make whitespace underscore
   // console.log("title:"+page.title);
   // console.log("tit"+page.title.replace(/\s+/g, '_').replace(/\W/g, ''));
    page.urlTitle= page.title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    // Generates random 5 letter string
    page.title= Math.random().toString(36).substring(2, 7);
    page.urlTitle=page.title;
  }
});


var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull:false
    },
    email: {
        type: Sequelize.STRING,
        unique:true,
        validate:{
            isEmail:true
        }
    }
});

// page is part of User. ie each user has a page 
Page.belongsTo(User, { as: 'author' });



module.exports = {
  Page: Page,
  User: User
};