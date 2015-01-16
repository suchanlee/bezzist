'use strict';

var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var QuestionConstants = require('../constants/QuestionConstants');
var BezzistConstants = require('../constants/BezzistConstants');

var CHANGE_EVENT = BezzistConstants.Events.CHANGE;

var _questions = [];
var _featuredQuestionId = null;

var QuestionStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  init: function(questions) {
    questions.forEach(function(question) {
      _questions.push(question);
    });
  },

  getAll: function() {
    return _questions;
  },
});

AppDispatcher.register(function(payload) {
  var ActionTypes = QuestionConstants.ActionTypes;
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.ACTION_RECEIVE_ACTIVE_QUESTIONS:
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