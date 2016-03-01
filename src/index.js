'use strict';

var angular = require('angular');

require('./components/main');
require('./components/plugin-list');

/*
require('angular-new-router');
angular.module('site', ['ngNewRouter', 'main-info', 'plugin-list'])
.controller('AppController', ['$router', AppController]);

function AppController($router) {
	$router.config([
		{ path: '/', component: 'main-info', as: 'main-info' },
		{ path: '/plugins', component: 'plugin-list', as: 'plugin-list' }
	]);
}
*/

require('angular-route');

angular.module('site', ['ngRoute', 'main-info', 'plugin-list'])
.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    $locationProvider.html5Mode(true).hashPrefix('!');

	$routeProvider
	.when('/', {
		controller: 'MainCtrl',
		controllerAs: 'ctrl',
		templateUrl: 'main-info.html'
	})
	.when('/plugins', {
		controller: 'PluginListCtrl',
		controllerAs: 'ctrl',
		templateUrl: 'plugin-list.html'
	}).otherwise({
		redirectTo: '/'
	});
}]);
