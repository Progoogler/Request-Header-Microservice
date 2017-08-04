// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var os = require('os');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/api/whoami', function (req, res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var ipaddress = '';
  for (let i = 0; ip[i] !== ','; i++) {
    ipaddress += ip[i];
  }
  
  var lang = req.headers["accept-language"]; 
  var language = '';
  for (let i = 0; i < 6; i++) {
    language += lang[i];
  }
  
  var software = process.platform;
  software += ' ' + os.arch() + ' release:' + os.release();
  
  
  var response = {
    ipaddress,
    language,
    software,
  }
  
  res.send(response);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
