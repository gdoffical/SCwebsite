const express = require('express');
const bodyParser = require('body-parser');
const app = express()
var fs = require('fs');
var http = require("http");
var jsonfile = require('jsonfile');


app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World!')
})
/*
var file = './userdata.json'

app.post('/getdata', function(req, res){
  var user_name = req.body.name;
  var user_email = req.body.email;
  var user_age = req.body.age;
  var user_status = req.body.dropdown;
  var user_cOrs = req.body.CorS;
});

const users = require("./userdata");
let user = {
  name: user_name,
  email: user_email,
  age: user_age,
  status: user_status,
  cOrs: user_cOrs
};

users.push(user)
fs.writeFile("userdata.json", JSON.stringify(users), err => {
    if(err) throw err;
    console.log("Done Writing");
});

*/
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});
