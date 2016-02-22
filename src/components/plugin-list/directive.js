'use struct';

module.exports = function PluginList() {
	return {
		templateUrl: 'plugin-list.html',
		replace: true,
		controller: 'PluginListCtrl',
		controllerAs: 'ctrl'
	};
};
