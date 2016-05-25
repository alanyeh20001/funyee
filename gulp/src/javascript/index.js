var funyeeApp = angular.module("funyeeApp", ["ui.router", "pascalprecht.translate", "ngResource", "Devise"]);

(function() {
	'use strict';

	funyeeApp
	    .constant("API_URL", "/");
})

(function() {
    'use strict';

    var en_US = {
        "user.login": "Login",
        "user.login.test": "Login with test account",
        "user.logout": "Log Out",
        "user.pickOne": "Sign up with",
        "home": "home",
        "english": "English",
        "chinese": "Chinese",
        "japanese": "Japanese",
        "korean": "Korean",
        "question.ask": "Ask",
        "question.title": "Please enter your question here",
        "question.submit": "Submit",
        "question.cancel": "Cancel",
        "question.login.ask": "Login to ask",
        "question": "Question",
        "answer.title": "Please enter your answer here",
        "answer.reply": "Reply",
        "answer.reply.login.ask": "Login to Reply",
        "answer": "Answer",
        "language": "Language"
    };
    
    var zh_TW = {
        "user.login": "登入",
        "user.login.test": "測試帳號登入",
        "user.logout": "登出",
        "user.pickOne": "選擇登入方式",
        "home": "主頁",
        "english": "英文",
        "chinese": "中文",
        "japanese": "日文",
        "korean": "韓文",
        "question.ask": "提問",
        "question.title": "請輸入您的問題",
        "question.submit": "送出",
        "question.cancel": "取消",
        "question.login.ask": "請登入發問",
        "answer.title": "請輸入您的答案",
        "answer.reply": "回覆",
        "answer.reply.login.ask": "請登入回覆",
        "question": "問題",
        "answer": "答案",
        "language": "語言"
    };

    var ja = {
        "user.login": "登入",
        "user.logout": "登出",
        "user.pickOne": "選擇登入方式",
        "home": "主頁",
        "english": "英文",
        "chinese": "中文",
        "japanese": "日文",
        "korean": "韓文",
        "question.ask": "題問",
        "question.title": "請輸入您的問題",
        "question.submit": "送出",
        "question.login.ask": "請登入發問",
        "answer.title": "請輸入您的答案",
        "answer.reply": "回覆",
        "answer.reply.login.ask": "請登入回覆",
        "question": "問題",
        "answer": "答案",
        "language": "語言"
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
                    });
            }
        ]);
}());
