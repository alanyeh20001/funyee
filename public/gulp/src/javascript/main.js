var funyeeApp = angular.module("funyeeApp", ["ui.router"]);

(function() {
    funyeeApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    
        $urlRouterProvider.otherwise("/");
    
    	$stateProvider
            .state('index', {
                url: "/",
                views: {
                	"viewA": {templateUrl: "/templates/navbar.html"},
                	"viewB": {templateUrl: "/templates/topics.html"}
                }
            });
    }]);
}());