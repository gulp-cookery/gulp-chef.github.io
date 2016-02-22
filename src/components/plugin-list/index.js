'use strict';

var angular = require('angular');
var ngInfiniteScroll = require('ng-infinite-scroll');

angular.module('plugin-list', ['infinite-scroll'])
.directive('pluginList', require('./directive'))
.controller('PluginListCtrl', require('./controller'))
.run(['$templateCache', function ($templateCache) {
	$templateCache.put('plugin-list.html', require('./index.html'));
}]);
