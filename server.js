// Node.js http server
// Import core packages of Node.js
var fs = require('fs');
var http = require('http');
var url = require('url');

// Load data from JSON file
var data = fs.readFileSync('./data.json', 'utf8');
var jsonData = JSON.parse(data);

// Load page html from html file
fs.readFile('./index.html', function(error, html) {
  if(error) throw error;

  // Create http server
  http.createServer(function(req, res) {
    var resObj = {};
    var json;

    // If page request data, then respond related data
    var query = url.parse(req.url, true).query;
    if(query.name) {
      resObj.detail = jsonData[query.name];
      var json = JSON.stringify(resObj);
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(json);
      res.end();
    }

    // If no request, respond front page
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(html);
    res.end();
  }).listen(3000);
});