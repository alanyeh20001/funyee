(function() {
    'use strict';
    funyeeApp
        .factory('sentenceServ',["$resource", "API_URL",
            function($resource, API_URL) {
                var sentences = $resource(API_URL + "sentences/:id", {"id": "@id"}); 

                return {
                    getRestfulModel: function() {
                    	return sentences;
                    }
                };
            }
        ]);

}());