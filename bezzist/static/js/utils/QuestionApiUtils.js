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

  getPagedQuestions: function(query) {
    // will increment page count in QuestionStore everytime this is called
    var encodedQuery = query ? '?' + $.param(query) : '';
    var promise = $.getJSON('/api/v1/questions/' + encodedQuery);
    promise.done(function(payload) {
      QuestionServerActionCreators.receivePagedQuestions(
        payload.questions,
        payload.per_page,
        payload.count,
        payload.num_pages);
    });
  },

  getQuestions: function(query) {
    var encodedQuery = query ? '?' + $.param(query) : '';
    var promise = $.getJSON('/api/v1/questions/' + encodedQuery);
    promise.done(function(payload) {
      QuestionServerActionCreators.receiveQuestions(payload.questions);
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

  updateQuestion: function(questionId, questionText) {
    var promise = $.ajax({
      url: '/api/v1/questions/' + questionId + '/',
      type: 'PUT',
      dataType: 'json',
      data: JSON.stringify({
        'qId': questionId,
        'csrfmiddlewaretoken': docCookies.getItem('csrftoken'),
        'question': questionText
      })
    });
    promise.done(function(question) {
      QuestionServerActionCreators.updateQuestion(question);
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
      QuestionServerActionCreators.upvoteQuestionFailed(questionId, err.status);
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
      QuestionServerActionCreators.unvoteQuestionFailed(questionId, err.status);
    });
  }

};