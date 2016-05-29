(function() {
    'use strict';
    funyeeApp
        .factory('sentenceLikeServ',["$resource", "API_URL",
            function($resource, API_URL) {
                var sentencesLikes = $resource(API_URL + "sentence_likes/:id", {"id": "@id"}); 

                return {
                    getRestfulModel: function() {
                    	return sentencesLikes;
                    }
                };
            }
        ]);

}());