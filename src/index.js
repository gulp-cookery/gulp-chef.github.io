'use strict';

var angular = require('angular');
var main = require('./components/main');
var plugins = require('./components/plugin-list');

angular.module('site', ['main-info', 'plugin-list']);
