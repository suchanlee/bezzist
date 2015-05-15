/**
 * UserStore
 *
 * Keeps a user object and objects for keeping track of
 * liked questions and answers.
 *
 * Subscribed to actions from [UserServerActionCreators,
 * UserViewActionCreators].
 */

'use strict';

/*
 * General library imports
 */
var _ = require('underscore');

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
 * Constant imports
 */
var UserConstants = require('../constants/UserConstants');
var BezzistConstants = require('../constants/BezzistConstants');

/*
 * UserStore object
 * and user tracking objects.
 */
var _user = null;
var _point_status = null;
var _liked_question_ids = {};
var _liked_answer_ids = {};
var _created_question_ids = {};
var _created_answer_ids = {};

var UserStore = _.extend(_.clone(BaseStore), {

  setUser: function(user) {
    if (!_user) {
      _user = user;
      _liked_question_ids = Utils.listToSet(user.liked_question_ids);
      _liked_answer_ids = Utils.listToSet(user.liked_answer_ids);
      _created_question_ids = Utils.listToSet(user.created_question_ids);
      _created_answer_ids = Utils.listToSet(user.created_answer_ids);
      this._setPointStatus(user.score);
    }
  },

  getUser: function() {
    return _user;
  },

  isAuthenticated: function() {
    return _user != null;
  },

  isSuperuser: function() {
    if (this.isAuthenticated()) {
      return _user.superuser;
    } else {
      return false;
    }
  },

  addQuestionLiked: function(questionId) {
    _liked_question_ids[questionId] = true;
  },

  containsQuestionLiked: function(questionId) {
    return questionId in _liked_question_ids;
  },

  removeQuestionLiked: function(questionId) {
    delete _liked_question_ids[questionId];
  },

  addAnswerLiked: function(answerId) {
    _liked_answer_ids[answerId] = true;
  },

  containsAnswerLiked: function(answerId) {
    return answerId in _liked_answer_ids;
  },

  removeAnswerLiked: function(answerId) {
    delete _liked_answer_ids[answerId];
  },

  isAnswerOwner: function(answerId) {
    return answerId in _created_answer_ids;
  },

  isQuestionOwner: function(questionId) {
    return questionId in _created_question_ids;
  },

  _setPointStatus: function(points) {
    var ranks = _.map(Object.keys(UserConstants.Points), function(rank) { return parseInt(rank) });
    for (var i=0; i < ranks.length; i++) {
      if (ranks[i] === _user.score) {
        _point_status = UserConstants.Points[ranks[i]];
        return;
      } else if (ranks[i] > _user.score) {
        _point_status = UserConstants.Points[ranks[i-1]];
        return;
      }
    }
  },

  getPointStatus: function() {
    return _point_status;
  },

  incrementPoints: function(increment) {
    _user.score += increment;
    this._setPointStatus(_user.score);
  },

  decrementPoints: function(decrement) {
    _user.score -= decrement;
    this._setPointStatus(_user.score);
  }
});

UserStore.setChangeEvent(BezzistConstants.Events.USER_CHANGE);

AppDispatcher.register(function(payload) {

  var ActionTypes = UserConstants.ActionTypes;
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.RECEIVE_USER:
      if (Object.keys(action.userprofile).length > 0) {
        UserStore.setUser(action.userprofile);
      }
      if (action.cb) {
        action.cb();
      }
      UserStore.emitChange();
      break;

    case ActionTypes.INCREMENT_USER_POINTS:
      UserStore.incrementPoints(action.increment);
      UserStore.emitChange();
      break;

    case ActionTypes.DECREMENT_USER_POINTS:
      UserStore.decrementPoints(action.decrement);
      UserStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = UserStore;