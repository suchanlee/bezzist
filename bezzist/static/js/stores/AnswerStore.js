'use strict';

var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AnswerConstants = require('../constants/AnswerConstants');
var BezzistConstants = require('../constants/BezzistConstants');

var CHANGE_EVENT = BezzistConstants.Events.CHANGE;

var _answers = {}; // key | value = questionId | list of answers

var AnswerStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  getAnswersForQuestion: function(questionId) {
    if (questionId in _answers) {
      return _answers[questionId];
    } else {
      return [];
    }
  },

});

MicroEvent.mixin(AnswerStore);

AppDispatcher.register({

  var ActionTypes = AnswerConstants.ActionTypes;

});

module.exports = AnswerStore;