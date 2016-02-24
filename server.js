'use strict';

var express = require('express'),
    routes = require('./app/routes/index.js'),
    api = require('./app/ant-url.js'),
    mongo = require('mongodb').MongoClient,
    mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/ant-url',
    port = process.env.PORT || 8080,
    app = express();

mongo.connect(mongoUri, function (err, db) {
  
  if (err) throw new Error('Database failed to connect!');
  else console.log('MongoDB successfully connected on port 27017.');
  
  db.createCollection('urls');
  
  routes(app);
  api(app, db);

  app.listen(port, function () {
    console.log('Express server listening on port %d in %s mode', this.address().port, app.settings.env);
  });

});