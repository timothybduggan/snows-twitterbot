console.log("BitcoinBot v1.0.0 starting up...");

var yahooFinance = require('yahoo-finance');

var btc = {
	symbol: '^NYXBT',
	modules: ['price']
}

yahooFinance.quote(btc, stockData);

function stockData(err, quotes) {
	console.log('Current Rate: ' + quotes.price.regularMarketPrice + ' USD = 1 BTC');
}
