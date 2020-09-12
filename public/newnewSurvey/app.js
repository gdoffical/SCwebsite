const express = require('express');
const bodyParser = require('body-parser');
const app = express()
var fs = require('fs');
var http = require("http");


app.get('*', function(req, res){
  if(req.accepts('html')){
    res.send('404', '<script> location.href = "./404.html"; </script>');
    return;
  }
});

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World!')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});
