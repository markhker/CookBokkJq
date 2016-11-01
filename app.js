var express = require('express');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var AWS = require('aws-sdk');
//var Uploader = require('s3-image-uploader');
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var app = express();

var data, sess;

AWS.config.loadFromPath('./s3_config.json');
var s3Bucket = new AWS.S3( { params: {Bucket: 'elasticbeanstalk-us-west-2-524253160393'} } );
var s3Url = 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-524253160393/';

app.use(session({
  name: 'server-session-cookie-id',
  secret: 'dfv7667g76dgsgysd76DFAR64wf',
  resave: true,
  saveUninitialized: false,
  store: new FileStore()
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
  sess.userData.dishImage = s3Url + 'dishImage-' + id;
  console.log(sess.userData.dishImage);
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
  sess.userData.userImage = s3Url + 'userImage-' + id;
  console.log(sess.userData.userImage);
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

app.get('/login', function(req, res){
  res.render('login');
});

app.post('/loginForm',function(req, res){
  data = req.body;
  sess = req.session;
  sess.userData = data;
  res.redirect('/upload');
  /*
  saveData(data, function(err) {
    if(err) {
      res.status(404).send('Data not saved');
      return;
    }
    res.redirect('/upload');
  });
  */
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
  sess.userData.recipe = data;
  res.redirect('/preview')
});

app.get('/preview', function(req, res){
  sess = req.session;
  if(!sess.userData.employeeid) {
    res.redirect('/login');
  }
  res.render('preview', {
    userName: sess.userData.firstName + ' '+ sess.userData.lastName,
    userLocation: sess.userData.city,
    userPosition: sess.userData.position
  });
  console.log(sess.userData);
});

function saveData(data, callback) {
  var id = JSON.stringify(data.employeeid);
  id = id.replace(/['"]+/g, '');
  fs.writeFile('./uploads/cookdata-'+ id +'.json', JSON.stringify(data), callback);
};


app.get(/^(.+)$/, function(req, res){
   res.sendFile( __dirname + req.params[0]);
});

app.listen(port, function(){
  console.log('Server listening on port 3000');
});
