var express = require('express');
var port = process.env.PORT || 3000;
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

var data;

app.use(express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'uploads')));

app.get('/', function(req, res){
  res.render('index');
});

app.get('/login', function(req, res){
  res.render('login');
});

app.post('/loginForm',function(req, res){
  data = req.body;
  saveData(data, function(err) {
    if(err) {
      res.status(404).send('Data not saved');
      return;
    }
    res.redirect('/upload');
  });
});

app.get('/upload', function(req, res){
  res.render('upload', {
    userName: data.firstName + ' '+ data.lastName,
    userLocation: data.city,
    userPosition: data.position
  });
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
