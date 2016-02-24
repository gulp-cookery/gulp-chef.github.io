'use struct';

module.exports = function sample() {
	return {
		template: require('./sample.md'),
		replace: true,
		controller: 'MainCtrl'
	};
};
