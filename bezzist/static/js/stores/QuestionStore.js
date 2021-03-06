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
var moment = require('moment');

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
      this.addQuestion(question);
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

  _createQuestion: function(question) {
    //TODO: this should just instantiate a Question
    // object and store it. Also, name is confusing.
    question.created = moment(question.created);
    question.modified = moment(question.modified);
    if (question.published) {
      question.published = moment(question.published);
    }
    return question
  },

  addQuestion: function(question) {
    question = this._createQuestion(question);
    _questions[question.id] = question; // more recent objects are favored
    if (question.featured) {
      _featuredQuestionId = question.id;
    } else if (question.active) {
      _activeQuestionIds[question.id] = true;
    } else {
      _inactiveQuestionIds[question.id] = true;
    }
  },

  updateQuestion: function(newQuestion) {
    // TODO: this needs to be refactored later
    // in to a more digestible format
    // it's gross right now
    var oldQuestion;
    if (_questions[TMP_QUESTION_ID]) {
      oldQuestion = _questions[newQuestion.id] = _questions[TMP_QUESTION_ID];
      this.removeQuestion(TMP_QUESTION_ID);
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
    return Utils.revSortByField(this._toList(_.keys(_activeQuestionIds)), 'published');
  },

  /*
   * Returns inactive questions reverse sorted
   * by score.
   */
  getInactiveQuestions: function() {
    return Utils.revSortByField(this._toList(_.keys(_inactiveQuestionIds)), 'score');
  },

  /*
   * Returns all questions sorted by score.
   */
  getQuestions: function() {
    return Utils.revSortByField(this._toList(), 'score');
  },
});

QuestionStore.setChangeEvent(BezzistConstants.Events.QUESTION_CHANGE);

AppDispatcher.register(function(payload) {
  var ActionTypes = QuestionConstants.ActionTypes;
  var Stores = BezzistConstants.Stores;
  var Status = BezzistConstants.Status;
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.QUESTION_RECEIVE:
      QuestionStore.addQuestion(action.question);
      QuestionStore.emitChange();
      break;

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
