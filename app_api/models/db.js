var mongoose = require('mongoose');
var gracefulShutdown;
// var dbURI = 'mongodb://localhost/WiFiDot';
var dbURI = 'mongodb://172.30.123.58/WiFiDot';

//Heroku connect mongolab
//if (process.env.NODE_ENV === 'production') {
//  dbURI = process.env.MONGOLAB_URI;
//}
//plug in promise ,solve promise deprecated!!!!
mongoose.Promise = global.Promise;

mongoose.connect(dbURI);

//Connection events
mongoose.connection.on('connected', function(){
	console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err){
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function(){
  console.log('Mongoose disconnected');
});

//capture app termination / restart events
//to be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
  mongoose.connection.close(function(){
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};
//for nodemon restarts
process.once('SIGUSR2', function(){
  gracefulShutdown('nodemon restarts', function(){
    process.kill(process.pid, 'SIGUSR2');
  });
});
//for app termination
process.on('SIGINT', function(){
  gracefulShutdown('app termination', function(){
    process.exit(0);
  });
});

require('./locations');
require('./users');

