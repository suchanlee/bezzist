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
    var promise = $.getJSON('/api/v1/answers/?qid=' + questionId);
    promise.done(function(answers) {
      AnswerServerActionCreators.receiveAnswersForQuestion(questionId, answers.answers);
    });
  },

  createAnswer: function(question, answerText) {
    var data = {qId: question.getId(), answer: answerText};
    var promise = $.post('/api/v1/answers/', JSON.stringify(data));
    promise.done(function(answer) {
      AnswerServerActionCreators.updateAnswer(question.getId(), answer);
      UserServerActionCreators.incrementPoints(PointsPerAction.CREATE);
      // TODO: add to _created_answer_ids
    });
    promise.fail(function() {
      AnswerServerActionCreators.createAnswerFailed(question.getId());
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
      } else {
        UserServerActionCreators.emitChange();
      }
    });
    promise.fail(function(err) {
      AnswerServerActionCreators.upvoteAnswerFailed(questionId, answerId, err.status);
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
      } else {
        UserServerActionCreators.emitChange();
      }
    });
    promise.fail(function(err) {
      AnswerServerActionCreators.unvoteAnswerFailed(questionId, answerId, err.status);
    });
  },

  updateAnswer: function(questionId, answerId, answer) {
    var promise = $.ajax({
      url: '/api/v1/answers/' + answerId + '/',
      type: 'PUT',
      dataType: 'json',
      data: JSON.stringify({
        'qId': questionId,
        'csrfmiddlewaretoken': docCookies.getItem('csrftoken'),
        'answer': answer
      })
    });
    promise.done(function(answer) {
      AnswerServerActionCreators.updateAnswer(questionId, answer);
    });
    return promise;
  }

};