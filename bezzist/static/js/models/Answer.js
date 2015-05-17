/**
 * Answer model.
 */

'use strict';

/*
 * General library imports
 */
var _ = require('underscore');
var moment = require('moment');
var store = require('store');

/*
 * Stores
 */
var UserStore = require('../stores/UserStore');

/*
 * Constants
 */
var AnswerConstants = require('../constants/AnswerConstants');
var BezzistConstants = require('../constants/BezzistConstants');
var Stores = BezzistConstants.Stores;
var Status = BezzistConstants.Status;

var Answer = function(id, answer, score, created, modified) {

  // private fields
  var _id, _answer, _score, _created, _modified;

  _id = id === undefined ? AnswerConstants.TMP_ANSWER_ID : id;
  if (answer === undefined) {
    throw new Error('Answer object cannot be created without an answer.');
  }
  _answer = answer;
  _score = score === undefined ? 0 : score;
  _created = created === undefined ? moment() : moment(created);
  _modified = modified === undefined ? moment() : moment(modified);

  this.getId = function() { return _id; };
  this.getAnswer = function() { return _answer; };
  this.getScore = function() { return _score; };
  this.getCreated = function() { return _created; };
  this.getModified = function() { return _modified; };

  this.incrementScore = function(status) {
    if (status !== Status.FORBIDDEN) {
      if (!UserStore.isAuthenticated()) {
        var update = {};
        update[_id] = true;
        store.set(Stores.BEZZIST_ANSWERS, _.extend(store.get(Stores.BEZZIST_ANSWERS), update));
      }
      if (!UserStore.isSuperuser()) {
        UserStore.addAnswerLiked(_id);
      }
    }
    _score += 1;
  };

  this.decrementScore = function(status) {
    if (_score === 0) {
      return;
    }
    if (status !== Status.FORBIDDEN) {
      if (!UserStore.isAuthenticated()) {
        var votedQuestions = store.get(Stores.BEZZIST_ANSWERS);
        delete votedQuestions[_id];
        store.set(Stores.BEZZIST_ANSWERS, votedQuestions);
      }
      UserStore.removeAnswerLiked(_id);
    }
    _score -= 1;
  };
};


module.exports = Answer;