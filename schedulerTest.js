var Node_Schedule = require('node-schedule');

var event = Node_Schedule.scheduleJob('0-15,30,45 * * * * *', function() {
	console.log('An increment of 15 seconds.');
})

var word = 'word';

if (word === 'word') {
	console.log('test 1 pass');
}
if (word == 'word') {
	console.log('test 2 pass');
}