console.log("StockSearch v1.0.0 starting up...");

{
	var request;
	var url;
	var website;
	var btc2usd;
}


initialize();

function initialize() {
	request = require('request');
	url = 'https://blockchain.info/ticker'
	website = {
		url: 'https://blockchain.info/ticker',
		json: true
	};
	btc2usd;
}


request(website, webData);

function webData(err, response, data) {
	if (err) {
		console.log("Something went wrong!");
	} else {
		console.log('Current Rate: ' + data.USD["15m"] + ' USD = 1 BTC');
	}
}

