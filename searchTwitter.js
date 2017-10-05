console.log("TwitterSearcher v1.0.0 starting up...");

var Twit = require('twit'); // This is the same as #include<package>

var config = require('./config');
var T = new Twit(config);


var searchParams = {
	q: 'trump',
	count: 5
}



T.get('search/tweets', searchParams, gotData);

function gotData(err, data, response) {
	//console.log(data);
	var tweets = data.statuses;
	for (var i = 0; i < tweets.length; i++) {
		console.log(tweets[i].text + '\n');
	}
}