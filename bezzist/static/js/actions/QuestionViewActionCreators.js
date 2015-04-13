'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/QuestionConstants').ActionTypes;
var QuestionApiUtils = require('../utils/QuestionApiUtils');

module.exports = {

  getQuestion: function(id) {
    QuestionApiUtils.getQuestion(id);
  },

  getQuestions: function(args) {
    QuestionApiUtils.getQuestions(args);
  },

  getPagedQuestions: function(page) {
    QuestionApiUtils.getPagedQuestions({
      active: true,
      page: page
    });
  },

  upvoteQuestion: function(questionId) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.QUESTION_UPVOTE,
      questionId: questionId
    });
    QuestionApiUtils.upvoteQuestion(questionId);
  },

  unvoteQuestion: function(questionId) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.QUESTION_UNVOTE,
      questionId: questionId
    });
    QuestionApiUtils.unvoteQuestion(questionId);
  },

  createQuestion: function(question) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.QUESTION_CREATE,
      question: question
    });
    return QuestionApiUtils.createQuestion(question);
  }

};