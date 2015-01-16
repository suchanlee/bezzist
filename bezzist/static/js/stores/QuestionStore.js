'use strict';

var _ = require('underscore');
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var AppDispatcher = require('../dispatcher/AppDispatcher');

var AnswerViewActionCreators = require('../actions/AnswerViewActionCreators');

var QuestionConstants = require('../constants/QuestionConstants');
var BezzistConstants = require('../constants/BezzistConstants');

var CHANGE_EVENT = BezzistConstants.Events.CHANGE;

var _questions = [];
var _featuredQuestion = null;
var _activeQuestions = [];

var QuestionStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  init: function(questions) {
    _.map(questions, function(question) {
      if (question.featured) {
        _featuredQuestion = question;
      } else if (questions.active) {
        _activeQuestions.push(question);
      } else {
        _questions.push(question);
      }
    });
  },

  getFeaturedQuestion: function() {
    return _featuredQuestion;
  },

  getAll: function() {
    return _questions;
  },
});

AppDispatcher.register(function(payload) {
  var ActionTypes = QuestionConstants.ActionTypes;
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.ACTION_RECEIVE_ALL_QUESTIONS:
      QuestionStore.init(action.questions);
      QuestionStore.emitChange();
      break;

    case ActionTypes.ACTION_CREATE:
      break;

    default:
        // no op
  }

});

module.exports = QuestionStore;