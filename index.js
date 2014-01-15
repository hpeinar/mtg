'use strict';

var config = require('easy-config');
var bunyan = require('bunyan');
var express = require('express');
var redis = require('redis');
var RedisStore = require('connect-redis')(express);

var log = bunyan.createLogger({
    name: config.log.name,
    level: config.log.level,
    serializers: {
        req: bunyan.stdSerializers.req,
        error: bunyan.stdSerializers.err
    }
});

var redisClient = redis.createClient(config.redis.port, config.redis.host, {auth_pass: config.redis.pass});
redisClient.select(config.redis.db);

var app = express();

app.use(express.compress());
app.use('/public', express.static(__dirname + '/public'));
app.use(express.cookieParser(config.secret));
app.use(express.session({
    store: new RedisStore({
        host: config.redis.host,
        port: config.redis.port,
        db: config.redis.db,
        pass: config.redis.password,
        retry_max_delay: 1000,
        connect_timeout: 1000,
        debug_mode: true,
        ttl: (60 * 60) // 60 minutes
    }),
    secret: config.secret
}));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.multipart());

app.use(function (req, res, next) {
    //Attach log and redis
    req.log = log;
    req.redis = redisClient;
    next();
});

app.use(app.router);

app.get('/', function (req, res, next) {
    res.sendfile('./public/html/index.html');
});

app.all('*', function (req, res, next) {
    next();
});

app.use('/cards', require('./lib/cards'));

app.listen(config.port, function () {
    log.info('%s listening on %d', config.name, config.port);
});