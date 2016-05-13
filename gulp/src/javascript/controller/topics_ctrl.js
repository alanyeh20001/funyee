(function() {
    funyeeApp
        .controller("topicsCtrl", ["$scope", "sentenceServ",
        	function($scope, sentenceServ) {
                this.datas= ["1", "2", "3", "4", "5", "6", "7"];
                this.title= "title";

                var Sentence = sentenceServ.getRestfulModel();
                console.log(Sentence.query());
                console.log(Sentence.get({id: 1}));
                var newSentence = new Sentence();
                newSentence.content = "Hello Bae !";
                newSentence.language = "Japanese";
                newSentence.is_question = true;
                newSentence.$save();
            }
        ]);
}());