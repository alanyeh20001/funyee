(function() {
    funyeeApp
        .controller("navbarCtrl", ["$scope", "$translate", 
        	function($scope, $translate) {
                this.changeLan = function(key) {
                    $translate.use(key);
                };
            }
        ]);
}());