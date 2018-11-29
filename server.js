var http = require('http'),
    httpProxy = require('http-proxy');
  var express = require('express');
  var app = express();
  var path = require('path');
var proxy = httpProxy.createProxyServer({});
//web server for the application
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});
app.use(express.static('./'))
console.log("listening for regular web traffic on port 8059")
app.listen(parseInt(8059));

var server = http.createServer(function(req, res) 
{
  let proxy_target = 'http://localhost:8059';
  if(req.method == 'OPTIONS')
  {
    res.statusCode= 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Target-Proxy, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
   res.end();
   return;
  }
  proxy_target = req.headers['target-proxy'];
  if(!proxy_target)
  {
    console.log("received request without target-proxy");
    return;
  }

  proxy.web(req, res, {
      target: proxy_target,
      secure: false,
      ws: false,
      prependPath: false,
      ignorePath: false,
  });
});
console.log("listening on port 8053")
server.listen(8053);

// Listen for the `error` event on `proxy`.
// as we will generate a big bunch of errors
proxy.on('error', function (err, req, res) {
  console.log(err)
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });
  res.end("Oops");
});

proxy.on('proxyRes', function(proxyRes, req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Target-Proxy, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
});