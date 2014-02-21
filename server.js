var express = require('express'),
    http = require('http'),
    path = require('path'),
    app = express(),
    consumerKey = require('./consumer_key.json')['500px'],
    request = require('request');

// all environments
app.set('port', process.env.PORT || 3000);

//app.configure(function(){
//  app.use(express.static(__dirname));
//});

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(app.router);

//app.use(function(req, res, next) {
//	res.status(404);
//
//    res.send('Oopps, 404');
//});

//app.get('/', function(req, res){
//    res.sendfile('index.html');
//});

// development only
if ('production' == app.get('env')) {
    app.use(express.static(path.join(__dirname, 'dist')));
} else {
    app.use(express.static(path.join(__dirname, 'app')));
    app.use(express.errorHandler());
}

/* special stuff for our proxied 500px calls */
if (consumerKey) {
    app.get('/proxy/500photos.php', function(req, res) {
        if (req.param('id')) {
            console.log('getting photo info for', req.param('id'));
            request('https://api.500px.com/v1/photos/' + req.param('id') + '?consumer_key=' + consumerKey).pipe(res); 
        } else {
            console.log('getting photo list');
            request('https://api.500px.com/v1/photos?feature=popular&consumer_key=' + consumerKey).pipe(res);
        }
    });
} else {
    console.log('WARNING: consumer_key.json file not found, 500px photos provider requires a valid consumer key file!');
}

console.log('Listening to localhost:' + app.get('port'));

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port %d in %s mode", app.get('port'), app.get('env'));
});