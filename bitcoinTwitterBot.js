console.log('BitcoinBot v1.0.0 starting up...');

var twit = require('twit'); // This is the same as #include<package>
var yahooFinance = require('yahoo-finance');

var config = require('./config');
var t = new twit(config);
var btc = {
	symbol: '^NYXBT',
	modules:['price']
}
var tweet = {
	status: ''
}

/* Loop (Everyday at 4pm) {
	yahooFinance.quote(btc, stockData);
	t.post('statuses/update', tweet, tweeted);

}
*/


function postTweet() {
	yahooFinance.quote(btc, stockData); // update stock price & tweet text
	t.post('statuses/update', tweet, tweeted); // post tweet
}

function stockData(err, quotes) {
	tweet.status = 'Current Rate: ' + quotes.price.regularMarketPrice + ' USD = 1 BTC';
}


function tweeted(err, data, response) {
	if (err) {
		console.log("Something went wrong!");
	} else {
		console.log("Success!");
	}
}
