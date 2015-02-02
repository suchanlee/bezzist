'use strict';

var _ = require('underscore');
var assign = require('object-assign');
var store = require('store');
var moment = require('moment');
var EventEmitter = require('events').EventEmitter;

var AppDispatcher = require('../dispatcher/AppDispatcher');

var AnswerViewActionCreators = require('../actions/AnswerViewActionCreators');

var UserStore = require('./UserStore');
var QuestionConstants = require('../constants/QuestionConstants');
var BezzistConstants = require('../constants/BezzistConstants');

var CHANGE_EVENT = BezzistConstants.Events.CHANGE;
var TMP_QUESTION_ID = -1;

var _questions = {};
var _activeQuestionIds = [];
var _inactiveQuestionIds = [];
var _finishedQuestionIds = [];
var _featuredQuestionIds = [];
var _currentQuestion = null;

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
      this.addQuestion(question);
    }.bind(this));
    if (_featuredQuestionIds.length > 0) {
      _currentQuestion = this.getQuestion(_featuredQuestionIds[0]);
    } else if (_activeQuestionIds.length > 0) {
      _currentQuestion = this.getQuestion(_activeQuestionIds[0]);
    } else {
      _currentQuestion = {
        id: -1,
        question: "What should tomorrow's question be?"
      }
    }
  },

  _toList: function(questionIds) {
    var questionList = []
    if (!questionIds) {
      questionIds = _questionList.keySet();
    }
    _.map(questionIds, function(id) {
      questionList.push(_questions[id]);
    });
    return questionList;
  },

  _createQuestion: function(question) {
    question.created = moment(question.created);
    question.modified = moment(question.modified);
    if (question.published) {
      question.published = moment(question.published);
    }
    return question
  },

  _sortQuestionsByScore: function(questionList) {
    return _.sortBy(questionList, function(question) {
      return -1 * question.score;
    });
  },

  _sortQuestionsByDatetime: function(questionList) {
    return _.sortBy(questionList, function(question) {
      return -1 * question.created;
    });
  },

  addQuestion: function(question) {
    question = this._createQuestion(question);
    _questions[question.id] = question;
    if (question.featured) {
      _featuredQuestionIds.push(question.id);
    } else if (question.active) {
      _activeQuestionIds.push(question.id);
    } else if (question.finished) {
      _finishedQuestionIds.push(question.id);
    } else {
      _inactiveQuestionIds.push(question.id);
    }
  },

  updateQuestion: function(newQuestion) {
    // TODO: this needs to be refactored later
    // in to a more digestible format
    // it's gross right now
    var oldQuestion;
    if (_questions[TMP_QUESTION_ID]) {
      oldQuestion = _questions[newQuestion.id] = _questions[TMP_QUESTION_ID];
      delete _questions[TMP_QUESTION_ID];
      var idx = _inactiveQuestionIds.indexOf(TMP_QUESTION_ID);
      _inactiveQuestionIds.splice(idx, 1);
      _inactiveQuestionIds.push(newQuestion.id);
    } else {
      oldQuestion = _questions[newQuestion.id];
    }
    var questionKeySet = Object.keys(newQuestion);
    if (Object.keys(oldQuestion).length === questionKeySet.length) {
      _questions[newQuestion.id] = newQuestion;
    } else {
      _.map(questionKeySet, function(key) {
        oldQuestion[key] = newQuestion[key];
      });
    }
  },

  removeQuestion: function(questionId) {
    delete _questions[questionId];
  },

  getQuestion: function(questionId) {
    return _questions[questionId];
  },

  getFeaturedQuestions: function() {
    return this._sortQuestionsByDatetime(this._toList(_featuredQuestionIds));
  },

  getActiveQuestions: function() {
    return this._sortQuestionsByDatetime(this._toList(_activeQuestionIds));
  },

  getInactiveQuestions: function() {
    return this._sortQuestionsByScore(this._toList(_inactiveQuestionIds));
  },

  getFinishedQuestions: function() {
    return this._sortQuestionsByDatetime(this._toList(_finishedQuestionIds));
  },

  getCurrentQuestion: function() {
    return _currentQuestion;
  },

  getQuestions: function() {
    return this._sortQuestionsByScore(this._toList());
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
      if (!UserStore.isAuthenticated()) {
        var update = {};
        update[action.questionId] = true;
        store.set(Stores.BEZZIST_QUESTIONS, _.extend(store.get(Stores.BEZZIST_QUESTIONS), update));
      }
      UserStore.addQuestionLiked(action.questionId);
      QuestionStore.emitChange();
      break;

    case ActionTypes.QUESTION_UPVOTE_FAILED:
      QuestionStore.getQuestion(action.questionId).score -= 1;
      if (action.status !== Status.FORBIDDEN) {
        if (!UserStore.isAuthenticated()) {
          var votedQuestions = store.get(Stores.BEZZIST_QUESTIONS);
          delete votedQuestions[action.questionId];
          store.set(Stores.BEZZIST_QUESTIONS, votedQuestions);
        }
        UserStore.removeQuestionLiked(action.questionId);
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

    case ActionTypes.SET_CURRENT_QUESTION:
      _currentQuestion = action.question;
      QuestionStore.emitChange();
      break;

    default:
        // no op
  }

});

module.exports = QuestionStore;