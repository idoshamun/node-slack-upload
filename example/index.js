/**
 * Module dependencies.
 */
var Slack = require('..');
var fs = require('fs');
var path = require('path');

var slack = new Slack('xxxxxxxxxxxxxxxxxxx');

slack.uploadFile({
	file: fs.createReadStream(path.join(__dirname, '..', 'README.md')),
	filetype: 'post',
	title: 'README',
	initialComment: 'my initial commit',
	channels: 'XXXXX'
}, function(err) {
	if (err) {
		console.error(err);
	}
	else {
		console.log('done');
	}
});
