'use strict';

var $ = require('jquery');
var docCookies = require('../lib/cookies');
var Fingerprint = require('fingerprintjs');
var QuestionServerActionCreators = require('../actions/QuestionServerActionCreators');

module.exports = {

  getAllQuestions: function() {
    var promise = $.getJSON('/api/v1/questions/');
    promise.done(function(questions) {
      QuestionServerActionCreators.receiveAllQuestions(questions.questions);
    });
  },

  createQuestion: function(question) {
    var promise = $.post('/api/v1/questions/', JSON.stringify({
      question: question
    }));
    promise.done(function(question) {
      QuestionServerActionCreators.updateQuestion(question);
    });
    promise.fail(function() {
      QuestionServerActionCreators.createQuestionFailed();
    });
    return promise;
  },

  upvoteQuestion: function(questionId) {
    var promise = $.ajax({
      url: '/api/v1/questions/' + questionId + '/incrementScore',
      type: 'POST',
      data: {
        'bId': new Fingerprint().get(),
        'csrfmiddlewaretoken': docCookies.getItem('csrftoken')
      },
    });
    promise.fail(function(err) {
      QuestionServerActionCreators.upvoteFailedForQuestion(questionId, err.status);
    });
  }

};