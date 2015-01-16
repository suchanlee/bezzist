'use strict';

var _ = require('underscore');
var $ = require('jquery');
var AnswerServerActionCreators = require('../actions/AnswerServerActionCreators');

module.exports = {

  getActiveAndFeaturedAnswers: function() {
    var promise = $.getJSON('/api/v1/answers/activeAndFeatured');
    promise.done(function(answers) {
      _.map(answers, function(answer) {
        AnswerServerActionCreators.receiveAnswersForQuestion(answer.questionId, answer.answers);
      });
    });
  },

  getAnswersForQuestion: function(questionId) {
    var promise = $.getJSON('/api/v1/question/' + questionId + '/answers');
    promise.done(function(answers) {
      AnswerServerActionCreators.receiveAnswersForQuestion(questionId, answers.answers);
    });
  },

  createAnswer: function(questionId, answer) {
    var data = {qId: questionId, answer: answer};
    var promise = $.post('/api/v1/answers/', JSON.stringify(data));
    promise.done(function(answer) {
      AnswerServerActionCreators.updateAnswer(questionId, answer);
    });
    promise.fail(function() {
      AnswerServerActionCreators.createAnswerFailed(questionId);
    });
    return promise;
  },

  upvoteAnswer: function(questionId, answerId) {
    var promise = $.ajax({
      url: '/api/v1/answers/' + answerId + '/incrementScore',
      type: 'POST',
      data: {
        'csrfmiddlewaretoken': $('#csrf input').val()
      },
    });
    promise.fail(function() {
      AnswerServerActionCreators.upvoteFailedForAnswer(questionId, answerId);
    });
  },

};