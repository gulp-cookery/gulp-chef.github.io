'use strict';

var angular = require('angular');

angular.module('main-info', [])
.directive('mainInfo', require('./directive'))
.directive('sample', require('./sample-directive'))
.controller('MainCtrl', require('./controller'))
.run(['$templateCache', function ($templateCache) {
	$templateCache.put('main-info.html', require('./index.html'));
}]);
