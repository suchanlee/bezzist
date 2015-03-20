'use strict';

var _ = require('underscore');
var $ = require('jquery');
var docCookies = require('../lib/cookies');
var Fingerprint = require('fingerprintjs');

var UserStore = require('../stores/UserStore');

var AnswerServerActionCreators = require('../actions/AnswerServerActionCreators');
var UserServerActionCreators = require('../actions/UserServerActionCreators');
var PointsPerAction = require('../constants/UserConstants').PointsPerAction;

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
    var promise = $.getJSON('/api/v1/questions/' + questionId + '/answers');
    promise.done(function(answers) {
      AnswerServerActionCreators.receiveAnswersForQuestion(questionId, answers.answers);
    });
  },

  createAnswer: function(questionId, answer) {
    var data = {qId: questionId, answer: answer};
    var promise = $.post('/api/v1/answers/', JSON.stringify(data));
    promise.done(function(answer) {
      AnswerServerActionCreators.updateAnswer(questionId, answer);
      UserServerActionCreators.incrementPoints(PointsPerAction.CREATE);
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
        'bId': new Fingerprint().get(),  // unique browser id from browser fingerprinting
        'csrfmiddlewaretoken': docCookies.getItem('csrftoken'),
      },
    });
    promise.done(function() {
      if (UserStore.isAuthenticated()) {
        UserServerActionCreators.incrementPoints(PointsPerAction.VOTE);
      }
    });
    promise.fail(function(err) {
      AnswerServerActionCreators.upvoteFailedForAnswer(questionId, answerId, err.status);
    });
  },

  unvoteAnswer: function(questionId, answerId) {
    var promise = $.ajax({
      url: '/api/v1/answers/' + answerId + '/decrementScore',
      type: 'POST',
      data: {
        'bId': new Fingerprint().get(),  // unique browser id from browser fingerprinting
        'csrfmiddlewaretoken': docCookies.getItem('csrftoken'),
      },
    });
    promise.done(function() {
      if (UserStore.isAuthenticated()) {
        UserServerActionCreators.decrementPoints(PointsPerAction.VOTE);
      }
    });
    promise.fail(function(err) {
      AnswerServerActionCreators.unvoteFailedForAnswer(questionId, answerId, err.status);
    });
  },

};