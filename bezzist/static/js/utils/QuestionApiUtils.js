'use strict';

var $ = require('jquery');
var docCookies = require('../lib/cookies');
var Fingerprint = require('fingerprintjs');

var UserStore = require('../stores/UserStore');

var QuestionServerActionCreators = require('../actions/QuestionServerActionCreators');
var UserServerActionCreators = require('../actions/UserServerActionCreators');
var PointsPerAction = require('../constants/UserConstants').PointsPerAction;

module.exports = {

  getQuestion: function(qId) {
    var promise = $.getJSON('/api/v1/questions/' + qId + '/');
    promise.done(function(q) {
      QuestionServerActionCreators.receiveQuestion(q);
    });
  },

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
      UserServerActionCreators.incrementPoints(PointsPerAction.CREATE);
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
    promise.done(function() {
      if (UserStore.isAuthenticated()) {
        UserServerActionCreators.incrementPoints(PointsPerAction.VOTE);
      }
    });
    promise.fail(function(err) {
      QuestionServerActionCreators.upvoteFailedForQuestion(questionId, err.status);
    });
  },

  unvoteQuestion: function(questionId) {
    var promise = $.ajax({
      url: '/api/v1/questions/' + questionId + '/decrementScore',
      type: 'POST',
      data: {
        'bId': new Fingerprint().get(),
        'csrfmiddlewaretoken': docCookies.getItem('csrftoken')
      },
    });
    promise.done(function() {
      if (UserStore.isAuthenticated()) {
        UserServerActionCreators.decrementPoints(PointsPerAction.VOTE);
      }
    });
    promise.fail(function(err) {
      QuestionServerActionCreators.unvoteFailedForQuestion(questionId, err.status);
    });
  }

};