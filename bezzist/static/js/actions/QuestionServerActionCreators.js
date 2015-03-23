'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/QuestionConstants').ActionTypes;

var AnswerApiUtils = require('../utils/AnswerApiUtils');

var _receiveAnswersForQuestions = function(questions) {
  for (var i = 0; i < questions.length; i++) {
    if (questions[i].active) {
      AnswerApiUtils.getAnswersForQuestion(questions[i].id);
    }
  }
}

module.exports = {

  receiveQuestion: function(question) {
    AppDispatcher.handleServerAction({
      question: question,
      type    : ActionTypes.QUESTION_RECEIVE
    });
    _receiveAnswersForQuestions([question]);
  },

  receiveQuestions: function(questions) {
    AppDispatcher.handleServerAction({
      questions: questions,
      type     : ActionTypes.RECEIVE_QUESTIONS,
    });
    _receiveAnswersForQuestions(questions);
  },

  receivePagedQuestions: function(questions, perPage, count, numPages) {
    AppDispatcher.handleServerAction({
      questions: questions,
      type     : ActionTypes.RECEIVE_PAGED_QUESTIONS,
      perPage  : perPage,
      count    : count,
      numPages : numPages
    });
    _receiveAnswersForQuestions(questions);
  },

  upvoteFailedForQuestion: function(questionId, status) {
    AppDispatcher.handleServerAction({
      questionId: questionId,
      type      : ActionTypes.QUESTION_UPVOTE_FAILED,
      status    : status
    });
  },

  unvoteFailedForQuestion: function(questionId, status) {
    AppDispatcher.handleServerAction({
      questionId: questionId,
      type      : ActionTypes.QUESTION_UNVOTE_FAILED,
      status    : status
    });
  },

  updateQuestion: function(question) {
    AppDispatcher.handleServerAction({
      question: question,
      type    : ActionTypes.QUESTION_UPDATE,
    });
  },

  createQuestionFailed: function() {
    AppDispatcher.handleServerAction({
      type: ActionTypes.QUESTION_CREATE_FAILED
    });
  },

};
