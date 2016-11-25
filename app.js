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

var data, sess, userImg, dishImg, lister, adminData, counter, retrieve;
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
app.use(bodyParser.json({limit: '10240mb'}));
app.use(bodyParser.urlencoded({limit: '10240mb', extended: true}));

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
var loaded = false;
counter = 0;
app.get('/admin', function(req, res){
  var params = {
    Delimiter: '',
    Prefix: 'cookdata',
    MaxKeys: 1000,
  };
  s3Bucket.listObjectsV2(params, function(err, data){
    if (err) {
      console.log(err, err.stack);
    } else {
      lister = data.KeyCount;
      for (var i = 0; i < lister; i++) {
          keys[i] = data.Contents[i].Key;
      };
      //console.log(keys);
      for (var j = 0; j < keys.length; j++) {
        (function(j){
          s3Bucket.getObject({Key: keys[j]}).
          on('error', function(response) {
            console.log(response);
          }).
          on('complete', function(response) {
            retrieve = JSON.parse(response.data.Body.toString('utf-8'));
            //var jsoning = JSON.stringify(retrieve);
            objectData.push(retrieve);
              //console.log(objectData);
            counter++;
            if(counter === keys.length){loaded=true};
          }).send();
        })(j);
      };
    };
  });
  
  var myVar = setInterval(function(){
    renderit();
  }, 300);
  
  function renderit() {
    if(loaded){
      res.render('admindashboard', {
        data: objectData,
        keys: lister,
        loaded: loaded
      });
      clearInterval(myVar);
    };
  };
  /*
    setTimeout(function(){ 
      //console.log(objectData[1]);
      res.render('admindashboard', {
        data: objectData,
        keys: lister,
        loaded: loaded
      });

    }, 8000);
    */
});

var loaded2 = false;
app.post('/adminedit' ,function(req, res){
  data = req.body;
  sess = req.session;
  console.log(data);
  s3Bucket.getObject({Key: data.key}).
  on('error', function(response) {
    console.log(response);
  }).
  on('complete', function(response) {
    adminData = JSON.parse(response.data.Body.toString('utf-8'));
    loaded2=true;
  }).send();
  
  var interv2 = setInterval(function(){
    renderit2();
  }, 100);
  
  function renderit2() {
    if(loaded2){
      sess.userData = adminData;
      console.log(adminData);
      res.redirect('/adminreview');
      clearInterval(interv2);
    };
  };
  /*
  setTimeout(function(){ 
    sess.userData = adminData;
    console.log(adminData);
    res.redirect('/adminreview');
  
  }, 5000);
  */
});

app.get('/adminreview', function(req, res){
  sess = req.session;
  res.render('adminreview', {
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
  
  //console.log(sess.userData);
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
