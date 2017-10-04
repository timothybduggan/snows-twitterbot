console.log("TwitterBot v1.0.0 starting up...");

var Twit = require('twit'); // This is the same as #include<package>

var config = require('./config');
var T = new Twit(config);

