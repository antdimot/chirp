"use strict"

// load external libraries
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors')();

// configure external libraries
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
// var multer = require('multer');
// app.use(multer);
//app.use(config.server.api,cors);

// load application libraries
const config = require('./config');
const logger = require('./util/logger')();
const helper = require('./util/helper')(logger);

// open a mongodb connection
const mongoClient = require('mongodb').MongoClient;
mongoClient.connect(config.mongodb.connectionString, { db: { bufferMaxEntries: 0 } },
    (err, db) => {
    if(err) {
        logger.error(err.message);
        process.exit(1);
    }
    
    // create the application context
    const appContext = {
       config: config,
       helper: helper,
       logger: logger,
       db : db
    };

    // static content
    app.use('/', express.static( __dirname + '/wwwroot', { 'dotfiles':'ignore' }));

    app.use((req,res,next)=> {
        logger.debug("[%s] request at [%s].", req.method, req.url);
        if(  req.method === "POST" ) {
            logger.debug( req.body );
        }
        next();
    });

    // load the routes
    app.use(require('./routes')(appContext));

    // set socket io connection
    io.on('connection',(socket)=>
    {
        logger.debug('[Socket IO] client connected');
        socket.on('disconnect',()=>{
            logger.debug('[Socket IO] client disconnected');
        });
        socket.on('postmessage',(data)=>{
            logger.debug('[Socket IO] broadcast <postmessage> event from [%s]', data);
            io.emit('postmessage', data);
        });
    });

    // set not find and error behaviors
    app.use( helper.action.notfoundResult );
    app.use( helper.action.errorResult );

    // start server
    var port = process.env.PORT || 3000;
    http.listen(port,()=> {
        logger.info('Server listening on port %s', port);
    });
});
