var funyeeApp = angular.module("funyeeApp", ["ui.router", "pascalprecht.translate", "ngResource"]);

(function() {
	'use strict';

	funyeeApp
	    .constant("API_URL", "http://localhost:3000/");
})

(function() {
    'use strict';

    var en_US = {
        "user.login": "Login",
        "user.pickOne": "Sign up with",
        "home": "home",
        "language.english": "english",
        "language.chinese": "chinese",
        "question.ask": "Ask"
    };
    
    var zh_TW = {
        "user.login": "登入",
        "user.pickOne": "選擇登入方式",
        "home": "主頁",
        "language.english": "英文",
        "language.chinese": "中文",
        "question.ask": "提問"
    };

    funyeeApp
        .config(['$translateProvider', 
        	function ($translateProvider) {

                $translateProvider.translations('en_US', en_US);
                $translateProvider.translations('zh_TW', zh_TW);
                $translateProvider.preferredLanguage('zh_TW');
                //$translateProvider.useSanitizeValueStrategy('sanitize');
            }
        ]);

}());

(function() {
    funyeeApp
        .config(['$stateProvider', '$urlRouterProvider', 
            function($stateProvider, $urlRouterProvider) {
    
                $urlRouterProvider.otherwise("/");
            
            	$stateProvider
                    .state('topics', {
                        url: "/",
                        views: {
                        	"viewA": {templateUrl: "dist/templates/topics.html"}
                        }
                    }).state('login', {
                        url: "/login",
                        views: {
                        	"viewA": {templateUrl: "dist/templates/user/login.html"}
                        }
                    }).state('login.test1', {
                    	url: "/test",
                        views: {
                        	"test1@login": {templateUrl: "dist/templates/user/test.html"}
                        }
                    });
            }
        ]);
}());