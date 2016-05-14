(function() {
    funyeeApp
        .controller("topicsCtrl", ["$scope", "sentenceServ",
        	function($scope, sentenceServ) {
                
                var Topics = this;
                var Sentence = sentenceServ.getRestfulModel();

                Topics.languages = [
                    "English",
                    "Chinese",
                    "Japanese",
                    "Korean"
                ];

                Topics.getTopics =function() {
                    Topics.topics = Sentence.query();
                    console.log(Topics.topics);
                };

                Topics.getTopics();

                Topics.submitQuestion = function() {
                    var content = Topics.questionContent,
                        language = Topics.languageSelected,
                        isQuestion = true;


                    console.log("Content: " + content + "\nLanguage: " + language);

                    if(content == undefined || content.length == 0) {
                        alert("You have to fullfill all columns!");
                        return;
                    }

                    var newSentence = new Sentence();
                    newSentence.content = content;
                    newSentence.language = language;
                    newSentence.is_question = isQuestion;
                    console.log(newSentence.$save());

                    Topics.askForm = false;
                    Topics.getTopics();

                };

                Topics.initTopicsFunction = function() {
                    Topics.showReply = {};
                    Topics.answersInfo = {};
                };

                Topics.initTopic = function(index) {
                    Topics.showReply[index] = false;
                    Topics.answersInfo[index] = {
                        answer: "",
                        language: ""
                    }
                };

                Topics.submitAnswer = function(index) {

                    var content = Topics.answersInfo[index].answer,
                        language = Topics.answersInfo[index].language,
                        isQuestion = false,
                        questionId = Topics.topics[index][0].question_id;

                    console.log("Content: " + content + "\nLanguage: " + language + "\nQuestion Id:" +questionId);

                    if(content == undefined || content.length == 0) {
                        alert("You have to fullfill all columns!");
                        return;
                    }

                    var newSentence = new Sentence();
                    newSentence.content = content;
                    newSentence.language = language;
                    newSentence.is_question = isQuestion;
                    newSentence.question_id = questionId;
                    console.log(newSentence.$save());

                    Topics.showReply[index] = false;
                    Topics.getTopics();
                };


            }
        ]);
}());