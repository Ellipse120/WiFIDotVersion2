var request = require('request');
/* GET home page. */
module.exports.about = function (req, res) {
	res.render('generic-text', {
		title: 'About WiFiDot',
		content: 'WiFiDot was created to help people find places to sit down and get a bit of work done.\n\nWiFiDot 是一个帮助人们找到一个有wifi的地方，在这个地方人们可以完成一些紧急的工作。'
	});
};

module.exports.angularApp = function(req, res) {
	res.render('layout', {title: 'WiFiDot'});
};