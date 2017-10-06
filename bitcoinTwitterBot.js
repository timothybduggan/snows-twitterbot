console.log('BitcoinBot v1.0.0 starting up...');

var twit = require('twit');
var request = require('request');
var scheduler = require('node-schedule');

{	// Variable Store
	// Variables for Bitcoin Exchange Rate
	var website;
	var btc2usd;
	// Variables for Twitter 
	var config;
	var t;
	var tweet;
	// Variables for Scheduler
	var schedule
}

initialize().then(start);

function initialize() {
	return new Promise(function(resolve, reject) {
	// Initialize Bitcoin Exchange Values
		website = {
			url: 'https://blockchain.info/ticker',
			json: true
		};
		btc2usd = {
			old: 0,
			new: 0,
			yesterday: 0,
			change: 0
		};
		// Initialize Twitter Values
		config = require('./config');
		t = new twit(config);
		tweet = {
			status: ''
		};
		// Initialize Schedueler
		resolve();
	});
}

function start() {
	// Post a tweet every hour
	hourlyPost = scheduler.scheduleJob('0 0-11,13-23 * * *', postTweet('hourly'));
	dailyPost  = scheduler.scheduleJob('0 12 * * *', postTweet('daily'));
	//surprisePost = setInterval(postTweet('mystery'), 1000*60*5);
	console.log('scheduled');
	
	//setInterval(postTweet,1000*30); // Then post every (30) seconds
}

function postTweet(type) {
	// This is a promise. "I will calculate the exchange, then you can post the tweet"
	calculateExchange(type).then(function(result) {	
		if (btc2usd.old != btc2usd.new) {
			t.post('statuses/update', tweet, tweeted);
			//console.log('  Would have Posted');
		}
	}, function(result) {
		console.log(result);
	})

	function tweeted(err, response, data) {
		if (err) {
			console.log('\tERROR: ' + err.message);	
		} else {
			console.log("\tPosted to Twitter");
		}
	}
}

// This calculates the BTC to USD exchange rate. Returns a promise (will finish before allowing a .then to happen)
function calculateExchange(type) {
	return new Promise(function(resolve, reject) {
		request(website, function(err, response, data) {
			if (err) {
				reject('Error getting data from server.');
			} else {
				twitter.status = '';
				btc2usd.old = btc2usd.new;
				btc2usd.new = data.USD["15m"];
				if (type === 'daily') {
					var change = (btc2usd.new - btc2usd.yesterday)/(btc2usd.yesterday);
					btc2usd.yesterday = btc2usd.new;
					if (change < 0) {
						tweet.status = 'Bad News: Since Yesterday, Bitcoin has dropped by ' + (0-change) + '%.\n';
					} else if (change > 0) {
						tweet.status = 'Good News: Since Yesterday, Bitcoin has increased by ' + change + '%.\n';
					} else {
						tweet.status = 'Bitcoin has the same value today as it did yesterday.\n';
					}
				} else if (type === 'hourly') {
					if (btc2usd.old < btc2usd.new) {
						tweet.status = 'This just in: Bitcoin is rising!\n';
					} else if (btc2usd.old > btc2usd.new) {
						tweet.status = 'Bad news: Bitcoin on the decline.\n';
					} else {
						tweet.status = 'Looks like we\'re stable.\n';
					}
				}

				tweet.status += 'Current Rate: ' + btc2usd.new + ' USD = 1 BTC';
				console.log(tweet.status);
				resolve();
			}
		});
	})
}
