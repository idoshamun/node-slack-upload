/**
 * Module dependencies.
 */
const request = require('request');
const _ = require('lodash');
_.mixin(require('underscore.string').exports());
const util = require('util');

/**
 * Create an object with slack configuration
 * @param {String} token Slack web api token
 * @constructor
 */
function Slack(token) {
	this.token = token;
	this.api = 'https://slack.com/api/';
}

/**
 * Upload file to slack
 * @see https://api.slack.com/methods/files.upload
 * @param {Object} data files.upload input as camelcase json (file should be a stream)
 * @param callback Callback function (err)
 */
Slack.prototype.uploadFile = function (data, callback) {
	let file;
	if (data.file && !data.content) {
		file = data.file;
		data = _.omit(data, 'file');
	}
	const params = _.reduce(data, function (res, value, key) {
		return util.format('%s&%s=%s', res, _.underscored(key), encodeURIComponent(value));
	}, '');
	const endpoint = util.format('%sfiles.upload?token=%s%s', this.api, this.token, params);
	const req = request.post(endpoint, function (err, response, body) {
		if (err) {
			return callback(err);
		}
		if (response.statusCode >= 300) {
			return callback(response);
		}
		body = JSON.parse(body);
		if (!body.ok) {
			return callback(body.error);
		}
		callback(null, body);
	});
	if (file) {
		const form = req.form();
		if (file.value) {
			form.append('file', file.value, file.options);
		} else {
			form.append('file', file);
		}
	}
};

module.exports = Slack;
