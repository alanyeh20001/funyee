(function() {
    funyeeApp
        .controller("topicsCtrl", ["$scope", "sentenceServ", "sentenceLikeServ", "$filter", "Auth",
        	function($scope, sentenceServ, sentenceLikeServ, $filter, Auth) {

                var Topics = this;
                var Sentence = sentenceServ.getRestfulModel();
                var SentenceLike = sentenceLikeServ.getRestfulModel();
                Topics.isLogin = false;

                Auth.currentUser()
                    .then(function(user) {
                        Topics.isLogin = true;
                        console.log(user);
                    }).then(function(error) {

                    });

                Topics.languages = [
                    "english",
                    "chinese",
                    "japanese",
                    "korean"
                ];

                Topics.addLike = function(sentence) {
                    if(sentence.actionFlag){
                        return
                    };
                    sentence.actionFlag = true;

                    var newSentenceLike = new SentenceLike();
                    newSentenceLike.sentence_id = sentence.id;
                    newSentenceLike.$save()
                        .then(function(result) {
                            sentence.like_id = result.like_id;
                            sentence.like_counts +=1;
                            sentence.actionFlag = false;
                        });
                };

                Topics.cancelLike =function(sentence) {
                    if(sentence.actionFlag){
                        return
                    };
                    sentence.actionFlag = true;
                    var params = {
                        id: sentence.like_id
                    }
                    SentenceLike.delete(params).$promise
                        .then(function(result) {
                            sentence.like_id = null;
                            sentence.like_counts -=1;
                            sentence.actionFlag = false;
                        });
                };

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

                    newSentence.$save()
                        .then(function(result) {
                            console.log(result);
                            Topics.askForm = false;
                            Topics.getTopics();
                            Topics.questionContent = "";
                        });
                    // (new Promise(function(resolve, reject) {
                    //     var result = newSentence.$save();
                    //     resolve(result);
                    // })).then(function(result) {
                    //     console.log(result);
                    //   Topics.askForm = false;
                    //   Topics.getTopics();
                    //   Topics.questionContent = "";
                    // });


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

                Topics.initTopicsLanguage = function(index) {
                    Topics.answersInfo[index].language = 'english';
                };

                Topics.initQuestionLanguage = function() {
                    Topics.languageSelected = 'english';
                }

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
                    //We want to eliminate it for the future
                    newSentence.language = "English";
                    newSentence.is_question = isQuestion;
                    newSentence.question_id = questionId;

                    newSentence.$save()
                        .then(function(result) {
                            console.log(result);
                            Topics.answersInfo[index].answer = "";
                            Topics.showReply[index] = false;
                            Topics.getTopics();                            
                        });


                };


            }
        ]);
}());