var funyeeApp = angular.module("funyeeApp", ["ui.router"]);

funyeeApp.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/templates/test.html");
});