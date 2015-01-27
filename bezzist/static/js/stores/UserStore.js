'use strict';

var assign = require('object-assign');
var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;

var AppDispatcher = require('../dispatcher/AppDispatcher');
var Utils = require('../lib/Utils');

var UserConstants = require('../constants/UserConstants');
var BezzistConstants = require('../constants/BezzistConstants');

var CHANGE_EVENT = BezzistConstants.Events.CHANGE;

var _user = null;
var _point_status = null;
var _liked_question_ids = {};
var _liked_answer_ids = {};

var UserStore = assign({}, EventEmitter.prototype, {

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

  setUser: function(user) {
    _user = user;
    _liked_question_ids = Utils.listToSet(user.liked_question_ids);
    _liked_answer_ids = Utils.listToSet(user.liked_answer_ids);
    this._setPointStatus(user.score);
  },

  getUser: function() {
    return _user;
  },

  isAuthenticated: function() {
    return _user != null;
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
  }

});

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

    case ActionTypes.RECEIVE_NON_USER:
      break;

    case ActionTypes.INCREMENT_USER_POINTS:
      UserStore.incrementPoints(action.increment);
      UserStore.emitChange();
      break;

    default:
      // no op
  }


});

module.exports = UserStore;