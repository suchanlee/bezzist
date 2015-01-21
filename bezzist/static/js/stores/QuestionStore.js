'use strict';

var _ = require('underscore');
var assign = require('object-assign');
var store = require('store');
var EventEmitter = require('events').EventEmitter;

var AppDispatcher = require('../dispatcher/AppDispatcher');

var AnswerViewActionCreators = require('../actions/AnswerViewActionCreators');

var QuestionConstants = require('../constants/QuestionConstants');
var BezzistConstants = require('../constants/BezzistConstants');

var CHANGE_EVENT = BezzistConstants.Events.CHANGE;
var TMP_QUESTION_ID = -1;

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

  _sortQuestions: function(questions) {
    return _.sortBy(questions, function(question) {
      return -1 * question.score;
    });
  },

  addQuestion: function(question) {
    _questions.push(question);
  },

  updateQuestion: function(question) {
    _.map(_questions, function(_question) {
      if (_question.id === -1 || _question.id === question.id) {
        var questionKeySet = Object.keys(question);
        if (Object.keys(_question).length === questionKeySet.length) {
          var idx = _questions.indexOf(_question);
          _questions.splice(idx, 1);
          _question.push(question);
        } else {
          _.map(questionKeySet, function(key) {
            _question[key] = question[key];
          });
        }
      }
    });
  },

  removeQuestion: function(questionId) {
    var question = this.getQuestion(questionId);
    _questions.splice(_questions.indexOf(question), 1);
  },

  getFeaturedQuestion: function() {
    return _featuredQuestion;
  },

  getQuestion: function(questionId) {
    for (var i=0; i<_questions.length; i++) {
      if (_questions[i].id === questionId) {
        return _questions[i];
      }
    }
    throw Error('Failed to find question with id ' + questionId + '.');
  },

  getQuestions: function() {
    return this._sortQuestions(_questions);
  },
});

AppDispatcher.register(function(payload) {
  var ActionTypes = QuestionConstants.ActionTypes;
  var Stores = BezzistConstants.Stores;
  var Status = BezzistConstants.Status;
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.QUESTION_UPVOTE:
      QuestionStore.getQuestion(action.questionId).score += 1;
      var update = {};
      update[action.questionId] = true;
      store.set(Stores.BEZZIST_QUESTIONS, _.extend(store.get(Stores.BEZZIST_QUESTIONS), update));
      QuestionStore.emitChange();
      break;

    case ActionTypes.QUESTION_UPVOTE_FAILED:
      QuestionStore.getQuestion(action.questionId).score -= 1;
      if (action.status !== Status.FORBIDDEN) {
        var votedQuestions = store.get(Stores.BEZZIST_QUESTIONS);
        delete votedQuestions[action.questionId];
        store.set(Stores.BEZZIST_QUESTIONS, votedQuestions);
      }
      QuestionStore.emitChange();
      break;

    case ActionTypes.RECEIVE_ALL_QUESTIONS:
      QuestionStore.init(action.questions);
      QuestionStore.emitChange();
      break;

    case ActionTypes.QUESTION_CREATE:
      QuestionStore.addQuestion({
        id: TMP_QUESTION_ID,
        question: action.question,
        score: 0,
        created: new Date(),
        modified: new Date()
      });
      QuestionStore.emitChange();
      break;

    case ActionTypes.QUESTION_CREATE_FAILED:
      QuestionStore.removeQuestion(TMP_QUESTION_ID);
      QuestionStore.emitChange();
      break;

    case ActionTypes.QUESTION_UPDATE:
      QuestionStore.updateQuestion(action.question);
      QuestionStore.emitChange();
      break;

    default:
        // no op
  }

});

module.exports = QuestionStore;