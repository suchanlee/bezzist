/**
 * QuestionStore
 *
 * Keeps a list of Question objects in a dictionary
 * whose key is the questionId and value is the question
 * object.
 *
 * Questions are tracked in two different lists
 * _activeQuestionIds and _inactiveQuestion ids, which
 * contain the ids of active and inactive questions,
 * respectively. Featured question is also tracked by
 * _featuredQuestionId.
 *
 * Subscribed to actions from [QuestionViewActionCreator,
 * QuestionServerActionCreator].
 */

'use strict';

/*
 * General library imports
 */
var _ = require('underscore');
var store = require('store');
var moment = require('moment');

/*
 * Dispatcher import
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');

/*
 * Store imports
 */
var BaseStore = require('./BaseStore');
var UserStore = require('./UserStore');

/*
 * Constant imports
 */
var QuestionConstants = require('../constants/QuestionConstants');
var BezzistConstants = require('../constants/BezzistConstants');

/*
 * Field declarations
 */
var TMP_QUESTION_ID = -1;

/*
 * Question store object
 * and question tracking lists.
 */
var _questions = {};
var _activeQuestionIds = [];
var _inactiveQuestionIds = [];
var _featuredQuestionId = null;
var QuestionStore = _.extend(BaseStore, {

  init: function(questions) {
    _.map(questions, function(question) {
      this.addQuestion(question);
    }.bind(this));
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

  _sortQuestionsByPublished: function(questionList) {
    return _.sortBy(questionList, function(question) {
      return -1 * question.published;
    });
  },

  addQuestion: function(question) {
    question = this._createQuestion(question);
    _questions[question.id] = question;
    if (question.featured) {
      _featuredQuestionId = question.id;
    } else if (question.active) {
      _activeQuestionIds.push(question.id);
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

  getFeaturedQuestion: function() {
    return _questions[_featuredQuestionId];
  },

  getActiveQuestions: function() {
    return this._sortQuestionsByPublished(this._toList(_activeQuestionIds));
  },

  getInactiveQuestions: function() {
    return this._sortQuestionsByScore(this._toList(_inactiveQuestionIds));
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
      //TODO: remove all this logic out to model when it's made.
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


    case ActionTypes.QUESTION_UNVOTE:
      QuestionStore.getQuestion(action.questionId).score -= 1;
      if (!UserStore.isAuthenticated()) {
        var votedQuestions = store.get(Stores.BEZZIST_QUESTIONS);
        delete votedQuestions[action.questionId];
        store.set(Stores.BEZZIST_QUESTIONS, votedQuestions);
      }
      UserStore.removeQuestionLiked(action.questionId);
      QuestionStore.emitChange();
      break;

    case ActionTypes.QUESTION_UNVOTE_FAILED:
      QuestionStore.getQuestion(action.questionId).score += 1;
      if (action.status !== Status.FORBIDDEN) {
        if (!UserStore.isAuthenticated()) {
          var update = {};
          update[action.questionId] = true;
          store.set(Stores.BEZZIST_QUESTIONS, _.extend(store.get(Stores.BEZZIST_QUESTIONS), update));
        }
        UserStore.addQuestionLiked(action.questionId);
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

/*
 * Module export declaration
 */
module.exports = QuestionStore;
