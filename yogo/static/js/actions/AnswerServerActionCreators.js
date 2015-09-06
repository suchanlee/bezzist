'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/AnswerConstants').ActionTypes;

module.exports = {

  receiveAnswersForQuestion: function(questionId, answers) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_ANSWERS_FOR_QUESTION,
      questionId: questionId,
      answers: answers
    });
  },

  updateAnswer: function(questionId, answer) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.ANSWER_UPDATE,
      questionId: questionId,
      answer: answer
    });
  },

  createAnswerFailed: function(questionId) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.ANSWER_CREATE_FAILED,
      questionId: questionId
    });
  },

  upvoteAnswerFailed: function(questionId, answerId, status) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.ANSWER_UPVOTE_FAILED,
      questionId: questionId,
      answerId: answerId,
      status: status
    });
  },

  unvoteAnswerFailed: function(questionId, answerId, status) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.ANSWER_UNVOTE_FAILED,
      questionId: questionId,
      answerId: answerId,
      status: status
    });
  },

};
