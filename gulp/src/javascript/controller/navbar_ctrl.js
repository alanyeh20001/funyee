(function() {
    funyeeApp
        .controller("navbarCtrl", ["$scope", "$translate", "$state", "Auth",
        	function($scope, $translate, $state, Auth) {

        		var Navbar = this;

                Navbar.isLogin = false;
                Auth.currentUser()
                    .then(function(user) {
                        Navbar.isLogin = true;
                        console.log("User's logging in~");
                        console.log(user);
                    }).then(function(error) {

                    });

                Navbar.changeLan = function(key) {
                    $translate.use(key);
                };

                Navbar.logout = function() {
                    var config = {
                        headers: {
                            'X-HTTP-Method-Override': 'DELETE'
                        }
                    };

                    Auth.logout(config).then(function(oldUser) {
                         console.log("Logout success! There's oldUser below");
                         console.log(oldUser);
                    }, function(error) {
                         console.log("Error occured!");
                         console.log(error);
                    });
            
                    $scope.$on('devise:logout', function(event, oldCurrentUser) {
                         console.log("Logout success!");
                         Navbar.isLogin = false;
                         $state.go('login');
                    });
                };
            }
        ]);
}());