'use strict';

var $ = require('jquery');
var QuestionActionCreators = require('../actions/QuestionActionCreators');
var QuestionConstants = require('../constants/QuestionConstants');

module.exports = {

  getActiveQuestions: function() {
    var promise = $.getJSON('/api/v1/questions/', {
      'active': true
    });
    promise.done(function() {
    });
  },

  createQuestion: function(question, userId) {
  },

  upvoteQuestion: function(questionId, userId) {
  }

};