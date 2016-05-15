(function() {
    funyeeApp
        .controller("loginCtrl", ["$state", "Auth",
        	function($state, Auth) {
                var Login = this;

                Login.testLogin = function() {
                    var credentials = {
                      email: "test_account@funyee.com",
                      password: "a1234567"
                    };

                    var config = {
                        headers: {
                            'X-HTTP-Method-Override': 'POST'
                        }
                    };

                    Auth.login(credentials, config)
                        .then(function(user) {
                            console.log("Login with test account success!");
                            console.log(user);
                            $state.go('topics');
                        });
                };
            }
        ]);
}());