'use strict';

var _ = require('underscore');
var assign = require('object-assign');
var store = require('store');
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
    var answer = this.getAnswerForQuestion(questionId, answerId);
    _answers[questionId].splice(_answers[questionId].indexOf(answer), 1);
  },

  storeAnswers: function(questionId, answers) {
    _answers[questionId] = answers;
  },

  getAnswerForQuestion: function(questionId, answerId) {
    for (var i=0; i<_answers[questionId].length; i++) {
      if (_answers[questionId][i].id === answerId) {
        return _answers[questionId][i];
      }
    }
    throw Error('Answer with id ' + answerId + ' for question with id ' + questionId + ' cannot be found.');
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
  var Stores = BezzistConstants.Stores;
  var Status = BezzistConstants.Status;
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.GET_ANSWERS_FOR_QUESTION:
      break;

    case ActionTypes.ANSWER_CREATE:
      AnswerStore.addAnswer(action.questionId, {
        id: TMP_ANSWER_ID,
        answer: action.answer,
        score: 0,
        created: new Date(),
        modified: new Date()
      });
      AnswerStore.emitChange();
      break;

    case ActionTypes.ANSWER_CREATE_FAILED:
      AnswerStore.removeAnswer(action.questionId, TMP_ANSWER_ID);
      AnswerStore.emitChange();
      break;

    case ActionTypes.ANSWER_UPDATE:
      AnswerStore.updateAnswer(action.questionId, action.answer);
      AnswerStore.emitChange();
      break;

    case ActionTypes.ANSWER_UPVOTE:
      AnswerStore.getAnswerForQuestion(action.questionId, action.answerId).score += 1;
      var update = {};
      update[action.answerId] = true;
      store.set(Stores.BEZZIST_ANSWERS, _.extend(store.get(Stores.BEZZIST_ANSWERS), update));
      AnswerStore.emitChange();
      break;

    case ActionTypes.ANSWER_UPVOTE_FAILED:
      AnswerStore.getAnswerForQuestion(action.questionId, action.answerId).score -= 1;
      if (action.status !== Status.FORBIDDEN) {
        var votedAnswers = store.get(Stores.BEZZIST_ANSWERS);
        delete votedAnswers[action.answerId];
        store.set(Stores.BEZZIST_ANSWERS, votedAnswers);
      }
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