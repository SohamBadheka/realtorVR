var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoSessionConnectURL = "mongodb://realtoruser:realtoruser@ds137891.mlab.com:37891/realtordb"
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);
var mongo = require("./routes/mongo");



var routes = require('./routes');
var users = require('./routes/user');
var realtor = require('./routes/realtor');

var app = express();

// view engine setup
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSession({
    secret: 'realtor',
    resave: false,  //don't save session if unmodified
    saveUninitialized: false,	// don't create session until something stored
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    store: new mongoStore({
        url: mongoSessionConnectURL
    })
}));
app.use(app.router);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});
app.get('/', routes.index);
app.get('/welcome', users.welcome);

app.get('/login', realtor.login);
app.get('/signup', realtor.signup);
app.post('/loginCheck', realtor.loginCheck);
app.post('/register', realtor.register);
app.get('/addListingPage', realtor.addListingPage);
app.post('/addListing', realtor.addListing);
app.get('/showListings', realtor.showListings);
app.get('/showSpecificListing', realtor.showSpecificListing);
app.get('/signout', realtor.signout);
/// catch 404 and forwarding to error handler


mongo.connect(mongoSessionConnectURL, function(){
    console.log('Connected to mongo at: ' + mongoSessionConnectURL);
    http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'));
    });
});

module.exports = app;
