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
	btc2usd = {
		old: 0,
		new: 0
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
	calculateExchange().then(function(result) {	
		if (btc2usd.old != btc2usd.new) {
			t.post('statuses/update', tweet, tweeted);
		}
	})

	function tweeted(err, response, data) {
		if (err) {
			console.log(err);
		} else {
			console.log("\tPosted to Twitter");
		}
	}
}




function calculateExchange() {
	return new Promise(function(resolve, reject) {
		request(website, function(err, response, data) {
			if (err) {
				reject('Error getting data from server.');
			} else {
				btc2usd.old = btc2usd.new;
				btc2usd.new = data.USD["15m"];
				if (btc2usd.old < btc2usd.new) {
					tweet.status = 'This just in: Bitcoin is rising!\nCurrent Rate: ' + btc2usd.new + ' USD = 1 BTC';
				} else if (btc2usd.old > btc2usd.new) {
					tweet.status = 'Bad news: Bitcoin on the decline.\nCurrent Rate: ' + btc2usd.new + ' USD = 1 BTC';
				} else {
					tweet.status = ''
				}
				console.log(tweet.status);
				resolve();
			}
		});
	})
}
