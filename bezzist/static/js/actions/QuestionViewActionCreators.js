'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/QuestionConstants').ActionTypes;

module.exports = {
  create: function(question, userId) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.ACTION_CREATE,
      question: question,
      userId: userId
    });
  },
  upvote: function(questionId, userId) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.ACTION_UPVOTE,
      question: questionId,
      userId: userId
    });
  }
};