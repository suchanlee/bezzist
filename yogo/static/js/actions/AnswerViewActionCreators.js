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

  createAnswer: function(question, answerText) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.ANSWER_CREATE,
      question: question,
      answerText: answerText
    });
    return AnswerApiUtils.createAnswer(question, answerText); // hack
  },

  upvoteAnswer: function(questionId, answerId) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.ANSWER_UPVOTE,
      questionId: questionId,
      answerId: answerId
    });
    AnswerApiUtils.upvoteAnswer(questionId, answerId);
  },

  unvoteAnswer: function(questionId, answerId) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.ANSWER_UNVOTE,
      questionId: questionId,
      answerId: answerId
    });
    AnswerApiUtils.unvoteAnswer(questionId, answerId);
  },

  updateAnswer: function(questionId, answerId, answer) {
    return AnswerApiUtils.updateAnswer(questionId, answerId, answer); // another hack
  },
};
