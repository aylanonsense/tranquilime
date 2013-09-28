var express = require('express.io');
var lessMiddleware = require('less-middleware');
var MongoStore = require('connect-mongo')(express);
var mongoose = require('mongoose');
var config = require('./config/config');
var web = require('./webroutes');
var models = require('./models');
var api = require('./api');
var app;

app = express();
app.http().io();

mongoose.connect(config.db.uri);

app.use(lessMiddleware({ src: __dirname + "/public", compress : true }));
app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(express.cookieParser());
app.use(express.session({
	store: new MongoStore({ url: config.db.uri }),
	secret: config.session.secret
}));

web.addRoutes(app);
api.addRoutes(app);

app.listen(config.server.port);

exports.app = app;