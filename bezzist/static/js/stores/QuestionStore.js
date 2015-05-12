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
 * Subscribed to actions from [QuestionViewActionCreators,
 * QuestionServerActionCreators].
 */

'use strict';

/*
 * General library imports
 */
var _ = require('underscore');
var store = require('store');

/*
 * Local library imports
 */
var Utils = require('../lib/Utils');

/*
 * Dispatcher import
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');

/*
 * Store imports
 */
var BaseStore = require('./BaseStore');

/*
 * Model factory imports
 */
var Questions = require('../models/Questions');

/*
 * Constant imports
 */
var QuestionConstants = require('../constants/QuestionConstants');
var BezzistConstants = require('../constants/BezzistConstants');
var TMP_QUESTION_ID = QuestionConstants.TMP_QUESTION_ID;

/*
 * QuestionStore object
 * and question tracking objects.
 */
var _questions = {};
var _activeQuestionIds = {};
var _inactiveQuestionIds = {};
var _featuredQuestionId = undefined;

var QuestionStore = _.extend(_.clone(BaseStore), {

  hasNext: true,

  page: 0,

  addQuestions: function(questions) {
    _.map(questions, function(question) {
      this.addQuestion(Questions.create(question));
    }.bind(this));
  },

  _toList: function(questionIds) {
    var questionList = []
    if (!questionIds) {
      questionIds = _.keys(_questions);
    }
    _.map(questionIds, function(id) {
      questionList.push(_questions[id]);
    });
    return questionList;
  },

  addQuestion: function(question) {
    _questions[question.getId()] = question; // more recent objects are favored
    if (question.isFeatured()) {
      _featuredQuestionId = question.getId();
    } else if (question.isActive()) {
      _activeQuestionIds[question.getId()] = true;
    } else {
      _inactiveQuestionIds[question.getId()] = true;
    }
  },

  updateQuestion: function(newQuestion) {
    if (_questions[TMP_QUESTION_ID]) {
      this.removeQuestion(TMP_QUESTION_ID);
    } else if (_questions[newQuestion.getId()]) {
      this.removeQuestion(newQuestion.getId());
    }
    this.addQuestion(newQuestion)
  },

  /**
   * Removes a question from a list
   * by removing from _questions and
   * question id tracker lists.
   *
   * @param  {number} questionId
   */
  removeQuestion: function(questionId) {
    delete _questions[questionId];
    delete _activeQuestionIds[questionId];
    delete _inactiveQuestionIds[questionId];
    if (_featuredQuestionId === questionId) {
      _featuredQuestionId = undefined;
    }
  },

  /**
   * Returns a question object with corresponding
   * question id.
   *
   * @param  {number} questionId
   * @return {Question}
   */
  getQuestion: function(questionId) {
    return _questions[questionId];
  },

  /*
   * Returns featured question question if it
   * exists. Returns undefined if not.
   */
  getFeaturedQuestion: function() {
    return _questions[_featuredQuestionId];
  },

  /*
   * Returns active questions reverse sorted by
   * published datetime.
   */
  getActiveQuestions: function() {
    return Utils.revSortByField(this._toList(_.keys(_activeQuestionIds)), 'getPublished');
  },

  /*
   * Returns inactive questions reverse sorted
   * by score.
   */
  getInactiveQuestions: function() {
    return Utils.revSortByField(this._toList(_.keys(_inactiveQuestionIds)), 'getScore');
  },

  /*
   * Returns all questions sorted by score.
   */
  getQuestions: function() {
    return Utils.revSortByField(this._toList(), 'getScore');
  },
});

QuestionStore.setChangeEvent(BezzistConstants.Events.QUESTION_CHANGE);

AppDispatcher.register(function(payload) {
  var ActionTypes = QuestionConstants.ActionTypes;
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.QUESTION_RECEIVE:
      QuestionStore.addQuestion(Questions.create(action.question));
      QuestionStore.emitChange();
      break;

    case ActionTypes.QUESTION_UPVOTE:
      QuestionStore.getQuestion(action.questionId).incrementScore();
      QuestionStore.emitChange();
      break;

    case ActionTypes.QUESTION_UPVOTE_FAILED:
      QuestionStore.getQuestion(action.questionId).decrementScore(action.status);
      QuestionStore.emitChange();
      break;


    case ActionTypes.QUESTION_UNVOTE:
      QuestionStore.getQuestion(action.questionId).decrementScore();
      QuestionStore.emitChange();
      break;

    case ActionTypes.QUESTION_UNVOTE_FAILED:
      QuestionStore.getQuestion(action.questionId).incrementScore(action.status);
      QuestionStore.emitChange();
      break;

    case ActionTypes.RECEIVE_QUESTIONS:
      QuestionStore.addQuestions(action.questions);
      QuestionStore.emitChange();
      break;

    case ActionTypes.RECEIVE_PAGED_QUESTIONS:
      QuestionStore.addQuestions(action.questions);
      QuestionStore.page += 1;
      if (action.numPages < QuestionStore.page) {
        QuestionStore.hasNext = false;
      }
      QuestionStore.emitChange();
      break;

    case ActionTypes.QUESTION_CREATE:
      QuestionStore.addQuestion(Questions.createTemp(action.question));
      QuestionStore.emitChange();
      break;

    case ActionTypes.QUESTION_CREATE_FAILED:
      QuestionStore.removeQuestion(TMP_QUESTION_ID);
      QuestionStore.emitChange();
      break;

    case ActionTypes.QUESTION_UPDATE:
      QuestionStore.updateQuestion(Questions.create(action.question));
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
