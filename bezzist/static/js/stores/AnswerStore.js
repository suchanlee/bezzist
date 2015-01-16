'use strict';

var _ = require('underscore');
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var AppDispatcher = require('../dispatcher/AppDispatcher');

var AnswerConstants = require('../constants/AnswerConstants');
var BezzistConstants = require('../constants/BezzistConstants');

var CHANGE_EVENT = BezzistConstants.Events.CHANGE;
var TMP_ANSWER_ID = -1; // impossible id for real model object

var _answers = {}; // key | value = questionId | list of answers

var AnswerStore = assign({}, EventEmitter.prototype, {

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

  _sortAnswers: function(answers) {
    return _.sortBy(answers, function(answer) {
      return -1 * answer.score;
    });
  },

  addAnswer: function(questionId, answer) {
    if (!(questionId in _answers)) {
      _answers[questionId] = [];
    }
    _answers[questionId].push(answer);
  },

  updateAnswer: function(questionId, answer) {
    _.map(_answers[questionId], function(_answer) {
      if (_answer.id === -1 || _answer.id === answer.id) {
        var answerKeySet = Object.keys(answer);
        if (Object.keys(_answer).length === answerKeySet.length) {
          var idx = _answers[questionId].indexOf(_answer);
          _answers[questionId].splice(idx, 1);
          _answers[questionId].push(answer);
        } else {
          _.map(answerKeySet, function(key) {
            _answer[key] = answer[key];
          });
        }
      }
    });
  },

  removeAnswer: function(questionId, answerId) {
    _.map(_answers[questionId], function(_answer) {
      if (_answer.id === answerId) {
        var idx = _answers[questionId].indexOf(_answer);
        _answers[questionId].splice(idx, 1);
      }
    });
  },

  storeAnswers: function(questionId, answers) {
    _answers[questionId] = answers;
  },

  getAnswersForQuestion: function(questionId) {
    if (questionId in _answers) {
      return this._sortAnswers(_answers[questionId]);
    } else {
      return [];
    }
  },

});

AppDispatcher.register(function(payload) {

  var ActionTypes = AnswerConstants.ActionTypes;
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.GET_ANSWERS_FOR_QUESTION:
      break;

    case ActionTypes.CREATE:
      AnswerStore.addAnswer(action.questionId, {
        id: TMP_ANSWER_ID,
        answer: action.answer,
        score: 0,
        created: new Date(),
      });
      AnswerStore.emitChange();
      break;

    case ActionTypes.CREATE_FAILED:
      AnswerStore.removeAnswer(action.questionId, TMP_ANSWER_ID);
      AnswerStore.emitChange();
      break;

    case ActionTypes.UPDATE:
      AnswerStore.updateAnswer(action.questionId, action.answer);
      AnswerStore.emitChange();
      break;

    case ActionTypes.UPVOTE:
      _.map(AnswerStore.getAnswersForQuestion(action.questionId), function(answer) {
        if (answer.id === action.answerId) {
          answer.score += 1;
        }
      });
      AnswerStore.emitChange();
      break;

    case ActionTypes.UPVOTE_FAILED:
      _.map(AnswerStore.getAnswersForQuestion(action.questionId), function(answer) {
        if (answer.id === action.answerId) {
          answer.score -= 1;
        }
      });
      AnswerStore.emitChange();
      break;

    case ActionTypes.RECEIVE_ANSWERS_FOR_QUESTION:
      AnswerStore.storeAnswers(action.questionId, action.answers);
      AnswerStore.emitChange();
      break;

    default:
      // no op
  }


});

module.exports = AnswerStore;