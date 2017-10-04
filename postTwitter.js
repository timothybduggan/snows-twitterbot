console.log("TwitterBot v1.0.0 starting up...");

var Twit = require('twit'); // This is the same as #include<package>

var config = require('./config');
var T = new Twit(config);

var tweet = {
	status: 'Let\'s Make a TwitterBot. #Automation'
}

T.post('statuses/update', tweet, tweeted);

function tweeted(err, data, response) {
	if (err) {
		console.log("Oops! Something went wrong!");
	} else {
		console.log("Success!");
	}
}