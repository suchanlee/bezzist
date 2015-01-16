'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/QuestionConstants').ActionTypes;

module.exports = {

  receiveAllQuestions: function(questions) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_ALL_QUESTIONS,
      questions: questions
    });
  },

  upvoteFailedForQuestion: function(questionId) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.QUESTION_UPVOTE_FAILED,
      questionId: questionId
    });
  },

  updateQuestion: function(question) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.QUESTION_UPDATE,
      question: question
    });
  },

  createQuestionFailed: function() {
    AppDispatcher.handleServerAction({
      type: ActionTypes.QUESTION_CREATE_FAILED
    });
  },

};
