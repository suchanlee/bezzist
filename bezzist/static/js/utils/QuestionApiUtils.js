'use strict';

var $ = require('jquery');
var QuestionServerActionCreators = require('../actions/QuestionServerActionCreators');

module.exports = {

  getAllQuestions: function() {
    var promise = $.getJSON('/api/v1/questions/');
    promise.done(function(questions) {
      QuestionServerActionCreators.receiveAllQuestions(questions.questions);
    });
  },

  createQuestion: function(question, userId) {
  },

  upvoteQuestion: function(questionId, userId) {
  }

};