var express = require('express');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var AWS = require('aws-sdk');
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var app = express();

var data, sess, userImg, dishImg, lister;
var objectData = [];
var keys = [];

AWS.config.loadFromPath('./s3_config.json');
var s3Bucket = new AWS.S3( { params: {Bucket: 'elastic-cookbook'} } );
var s3Url = 'https://s3-us-west-2.amazonaws.com/elastic-cookbook/';

app.use(session({
  name: 'server-session-cookie-id',
  secret: 'vgv78ABNggb98joketfaOYR67T6ydsef920481sMK',
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 21600000 },
  store: new FileStore({ttl:26400000})
}));

app.use(express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json({limit: '2048mb'}));
app.use(bodyParser.urlencoded({limit: '2048mb', extended: true}));

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'uploads')));

/* S3 Uploader */

app.post('/post-image', function(req, res, next){
  sess = req.session;
  var id = sess.userData.employeeid;
  dishImg = s3Url + 'dishImage-' + id;
  buf = new Buffer(req.body.imageBinary.replace(/^data:image\/\w+;base64,/, ""),'base64')
  var data = {
    Key: 'dishImage-'+id,
    Body: buf,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg',
    ACL: 'public-read'
  };
  s3Bucket.putObject(data, function(err, data){
      if (err) {
        console.log(err);
        console.log('Error uploading data: ', data);
      } else {
        console.log('succesfully uploaded the image!');
      }
  });
});

app.post('/post-image-user', function(req, res, next){
  sess = req.session;
  var id = sess.userData.employeeid;
  userImg = s3Url + 'userImage-' + id;
  buf = new Buffer(req.body.imageBinary.replace(/^data:image\/\w+;base64,/, ""),'base64')
  var data = {
    Key: 'userImage-'+id,
    Body: buf,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg',
    ACL: 'public-read'
  };
  s3Bucket.putObject(data, function(err, data){
      if (err) {
        console.log(err);
        console.log('Error uploading data: ', data);
      } else {
        console.log('succesfully uploaded the image!');
      }
  });
});
/* ENDS S3 Uploader */

app.get('/', function(req, res){
  res.render('index');
});

/* ADMIN DASHBOARD*/
app.get('/admin', function(req, res){
  var data = {
    Delimiter: '',
    Prefix: 'cookdata'
  };
  s3Bucket.listObjects(data, function(err, data){
    if (err) {
      console.log(err, err.stack);
    } else {
      lister = data;
      for (var i = 0; i < Object.keys(lister).length; i++) {
          keys[i] = lister.Contents[i].Key;
      };
      console.log(keys);
      
      for (var j = 0; j < keys.length; j++) {
        (function(j){
          s3Bucket.getObject({Key: keys[j]}, function(err, data){
            if (err) {
              console.log(err, err.stack);
            } else {
              var retrieve = JSON.parse(data.Body.toString('utf-8'));
              var jsoning = JSON.stringify(retrieve);
              objectData[j] = jsoning;
            }
          });
        })(j); // anonymous function to create scopes for loop
      };
      
      console.log(objectData[4]);
    };
  });
  
  
  
  res.render('admindashboard', {
    userName: objectData[0].firstName + ' '+ objectData[0].lastName,
    userLocation: objectData[0].city,
    userPosition: objectData[0].position,
    dishImage: objectData[0].dishImage,
    userImage: objectData[0].userImage,
    recipeTitle: objectData[0].recipe.recipeTitle,
    servings: objectData[0].recipe.recipeServings,
    setIng1: objectData[0].recipe.setIngredient_1,
    recipeIng1: objectData[0].recipe.recipeIngredient_1,
    setIng2: objectData[0].recipe.setIngredient_2,
    recipeIng2: objectData[0].recipe.recipeIngredient_2,
    setIng3: objectData[0].recipe.setIngredient_3,
    recipeIng3: objectData[0].recipe.recipeIngredient_3,
    setIng4: objectData[0].recipe.setIngredient_4,
    recipeIng4: objectData[0].recipe.recipeIngredient_4,
    setIng5: objectData[0].recipe.setIngredient_5,
    recipeIng5: objectData[0].recipe.recipeIngredient_5,
    meth1: objectData[0].recipe.recipeMethod_1,
    recipeMeth1: objectData[0].recipe.recipeStep_1,
    meth2: objectData[0].recipe.recipeMethod_2,
    recipeMeth2: objectData[0].recipe.recipeStep_2,
    meth3: objectData[0].recipe.recipeMethod_3,
    recipeMeth3: objectData[0].recipe.recipeStep_3,
    meth4: objectData[0].recipe.recipeMethod_4,
    recipeMeth4: objectData[0].recipe.recipeStep_4,
    meth5: objectData[0].recipe.recipeMethod_5,
    recipeMeth5: objectData[0].recipe.recipeStep_5,
    recipeStory: objectData[0].recipe.recipeStory,
  });
});
/* END ADMIN DASHBOARD*/

app.get('/login', function(req, res){
  res.render('login');
});

app.post('/loginForm',function(req, res){
  data = req.body;
  sess = req.session;
  sess.userData = data;
  res.redirect('/upload');
});

app.get('/upload', function(req, res){
  sess = req.session;
  if(!sess.userData.employeeid) {
    res.redirect('/login');
  }
  res.render('upload', {
    userName: sess.userData.firstName + ' '+ sess.userData.lastName,
    userLocation: sess.userData.city,
    userPosition: sess.userData.position
  });
});

app.post('/uploadRecipe',function(req, res){
  data = req.body;
  sess = req.session;
  if(!sess.userData.employeeid) {
    res.redirect('/login');
  }
  sess.userData.recipe = data;
  sess.userData.userImage = userImg;
  sess.userData.dishImage = dishImg;
  
  console.log(sess.userData);
  res.redirect('/preview')
});

app.get('/preview', function(req, res){
  sess = req.session;
  if(!sess.userData.employeeid) {
    res.redirect('/login');
  };
  
  res.render('preview', {
    userName: sess.userData.firstName + ' '+ sess.userData.lastName,
    userLocation: sess.userData.city,
    userPosition: sess.userData.position,
    dishImage: sess.userData.dishImage,
    userImage: sess.userData.userImage,
    recipeTitle: sess.userData.recipe.recipeTitle,
    servings: sess.userData.recipe.recipeServings,
    setIng1: sess.userData.recipe.setIngredient_1,
    recipeIng1: sess.userData.recipe.recipeIngredient_1,
    setIng2: sess.userData.recipe.setIngredient_2,
    recipeIng2: sess.userData.recipe.recipeIngredient_2,
    setIng3: sess.userData.recipe.setIngredient_3,
    recipeIng3: sess.userData.recipe.recipeIngredient_3,
    setIng4: sess.userData.recipe.setIngredient_4,
    recipeIng4: sess.userData.recipe.recipeIngredient_4,
    setIng5: sess.userData.recipe.setIngredient_5,
    recipeIng5: sess.userData.recipe.recipeIngredient_5,
    meth1: sess.userData.recipe.recipeMethod_1,
    recipeMeth1: sess.userData.recipe.recipeStep_1,
    meth2: sess.userData.recipe.recipeMethod_2,
    recipeMeth2: sess.userData.recipe.recipeStep_2,
    meth3: sess.userData.recipe.recipeMethod_3,
    recipeMeth3: sess.userData.recipe.recipeStep_3,
    meth4: sess.userData.recipe.recipeMethod_4,
    recipeMeth4: sess.userData.recipe.recipeStep_4,
    meth5: sess.userData.recipe.recipeMethod_5,
    recipeMeth5: sess.userData.recipe.recipeStep_5,
    recipeStory: sess.userData.recipe.recipeStory,
  });
});

app.get('/thanks', function(req, res){
  sess = req.session;
  var data = sess.userData; 
  if(!sess.userData.employeeid) {
    res.redirect('/login');
  }
  
  var id = data.employeeid;
  id = id.replace(/['"]+/g, '');

  var s3Data = {
    Key: 'cookdata-'+id+'.json',
    Body: JSON.stringify(data),
    ContentType: 'application/json',
    ACL: 'public-read'
  };
  s3Bucket.putObject(s3Data, function(err, data){
      if (err) {
        console.log(err);
        console.log('Error uploading data: ', data);
      } else {
        res.render('thanks', {
          userName: sess.userData.firstName + ' '+ sess.userData.lastName
        });
        console.log('succesfully uploaded the json!', s3Data.Body);
        /*
        sess.destroy(function(err) {
          console.log('sesión terminada')
        });
        */
      }
  });
});

app.get('/edit', function(req, res){
  sess = req.session;
  if(!sess.userData.employeeid) {
    res.redirect('/login');
  };
  
  res.render('edit', {
    userName: sess.userData.firstName + ' '+ sess.userData.lastName,
    userLocation: sess.userData.city,
    userPosition: sess.userData.position,
    dishImage: sess.userData.dishImage,
    userImage: sess.userData.userImage,
    recipeTitle: sess.userData.recipe.recipeTitle,
    servings: sess.userData.recipe.recipeServings,
    setIng1: sess.userData.recipe.setIngredient_1,
    recipeIng1: sess.userData.recipe.recipeIngredient_1,
    setIng2: sess.userData.recipe.setIngredient_2,
    recipeIng2: sess.userData.recipe.recipeIngredient_2,
    setIng3: sess.userData.recipe.setIngredient_3,
    recipeIng3: sess.userData.recipe.recipeIngredient_3,
    setIng4: sess.userData.recipe.setIngredient_4,
    recipeIng4: sess.userData.recipe.recipeIngredient_4,
    setIng5: sess.userData.recipe.setIngredient_5,
    recipeIng5: sess.userData.recipe.recipeIngredient_5,
    meth1: sess.userData.recipe.recipeMethod_1,
    recipeMeth1: sess.userData.recipe.recipeStep_1,
    meth2: sess.userData.recipe.recipeMethod_2,
    recipeMeth2: sess.userData.recipe.recipeStep_2,
    meth3: sess.userData.recipe.recipeMethod_3,
    recipeMeth3: sess.userData.recipe.recipeStep_3,
    meth4: sess.userData.recipe.recipeMethod_4,
    recipeMeth4: sess.userData.recipe.recipeStep_4,
    meth5: sess.userData.recipe.recipeMethod_5,
    recipeMeth5: sess.userData.recipe.recipeStep_5,
    recipeStory: sess.userData.recipe.recipeStory,
  });
});

app.get(/^(.+)$/, function(req, res){
   res.sendFile( __dirname + req.params[0]);
});

app.listen(port, function(){
  console.log('Server listening on port 3000');
});
