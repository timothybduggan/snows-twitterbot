console.log('BitcoinBot v1.0.0 starting up...');

var twit = require('twit');
var request = require('request');

{	// Variable Store
	// Variables for Bitcoin Exchange Rate
	var website;
	var btc2usd;
	// Variables for Twitter 
	var config;
	var t;
	var tweet;
	// Variables for Promise
}

initialize();
postTweet();
setInterval(postTweet, 1000*30); // Post every 20 seconds

function initialize() {
	// Initialize Bitcoin Exchange Values
	website = {
		url: 'https://blockchain.info/ticker',
		json: true
	};
	// Initialize Twitter Values
	config = require('./config');
	t = new twit(config);
	tweet = {
		status: ''
	};
	// Initialize Promise Values
}

function postTweet() {
	var promise = new Promise(function(resolve, reject) {
		if (reject) {
			console.log(reject);
		} else if (resolve) {
			console.log("Something went right");
		} else {
			console.log("Something went ???");
		}
	});

	promise.then(t.post('statuses/update', tweet, tweeted));

	

	function tweeted(err, response, data) {
		if (err) {
			console.log(err);
		} else {
			console.log("\tPosted to Twitter");
		}
	}
}

function calculateExchange() {
	request(website, function(err, response, data) {
		if (err) {
			console.log("Something went wrong when calculating exchange rate.");
		} else {
			tweet.status = 'Current Rate: ' + data.USD["15m"] + ' USD = 1 BTC';
			console.log(tweet.status);
		}
	});
}
