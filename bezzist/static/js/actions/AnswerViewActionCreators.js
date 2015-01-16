'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/AnswerConstants').ActionTypes;
var AnswerApiUtils = require('../utils/AnswerApiUtils');

module.exports = {

  getAnswersForQuestion: function(questionId) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.GET_ANSWERS_FOR_QUESTION,
      questionId: questionId
    });
  },

  createAnswer: function(questionId, answer) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CREATE,
      questionId: questionId,
      answer: answer
    });
    return AnswerApiUtils.createAnswer(questionId, answer); // hack
  },

  upvoteAnswer: function(questionId, answerId) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.UPVOTE,
      questionId: questionId,
      answerId: answerId
    });
    AnswerApiUtils.upvoteAnswer(questionId, answerId);
  },

};
