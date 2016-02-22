'use strict';

var angular = require('angular');

require('angular-new-router');
require('./components/main');
require('./components/plugin-list');

angular.module('site', ['ngNewRouter', 'main-info', 'plugin-list'])
.controller('AppController', ['$router', AppController]);

function AppController($router) {
	$router.config([
		{ path: '/', component: 'main-info', as: 'main-info' },
		{ path: '/plugins', component: 'plugin-list', as: 'plugin-list' }
	]);
}
