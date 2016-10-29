# node-slack-upload
> A node module for uploading files to slack using multipart or string

[Slack](https://slack.com/) is a messaging platform that is easy to integrate with.
This module should be useful for for uploading files to Slack!

## Install

node-slack-upload is available via npm:

```
npm install node-slack-upload
```

## Usage

Get your Slack api token from [here](https://api.slack.com/web).

```
var Slack = require('node-slack-upload');
var slack = new Slack(token);
```

To upload a file from the filesystem as a post
```
slack.uploadFile({
	file: fs.createReadStream(path.join(__dirname, '..', 'README.md')),
	filetype: 'post',
	title: 'README',
	initialComment: 'my comment',
	channels: 'XXXXX'
}, function(err, data) {
	if (err) {
		console.error(err);
	}
	else {
		console.log('Uploaded file details: ', data);
	}
});
```

To upload a file from a string as a post
```
slack.uploadFile({
	content: 'My file contents!',
	filetype: 'post',
	title: 'README',
	initialComment: 'my comment',
	channels: 'XXXXX'
}, function(err, data) {
	if (err) {
		console.error(err);
	}
	else {
		console.log('Uploaded file details: ', data);
	}
});
```
For more details please refer [https://api.slack.com/methods/files.upload](https://api.slack.com/methods/files.upload)
