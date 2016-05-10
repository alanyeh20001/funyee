var funyeeApp = angular.module("funyeeApp", ["ui.router"]);

(function() {
    funyeeApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    
        $urlRouterProvider.otherwise("/");
    
    	$stateProvider
            .state('topics', {
                url: "/",
                views: {
                	"viewA": {templateUrl: "dist/templates/topics.html"}
                }
            }).state('user', {
                url: "/user",
                views: {
                	"viewA": {templateUrl: "dist/templates/user.html"}
                }
            });
    }]);
}());