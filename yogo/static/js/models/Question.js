/**
 * Question model.
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
var QuestionConstants = require('../constants/QuestionConstants');
var BezzistConstants = require('../constants/BezzistConstants');
var Stores = BezzistConstants.Stores;
var Status = BezzistConstants.Status;

var Question = function(id, question, score, numVisible,
                        active, featured, locked, hideScoreUntilFinished,
                        created, modified, published) {

  // private fields
  var _id, _question, _score, _numVisible,
      _active, _featured, _locked, _hideScoreUntilFinished,
      _created, _modified, _published;

  _id = id === undefined ? QuestionConstants.TMP_QUESTION_ID : id;
  if (question === undefined) {
    throw new Error('Question object cannot be created without a question.');
  }
  _question = question;
  _score = score === undefined ? 0 : score;
  _numVisible = numVisible === undefined ? 5 : numVisible;
  _active = active === undefined ? false : active;
  _locked = locked === undefined ? false : locked;
  _hideScoreUntilFinished = hideScoreUntilFinished == undefined ? false : hideScoreUntilFinished;
  _featured = featured === undefined ? false : featured;
  _created = created === undefined ? moment() : moment(created);
  _modified = modified === undefined ? moment() : moment(modified);
  _published = published === undefined ? null : moment(published);

  this.getId = function() { return _id; };
  this.getQuestion = function() { return _question; };
  this.getNumVisible = function() { return _numVisible; };
  this.getScore = function() { return _score; };
  this.isActive = function() { return _active; };
  this.isFeatured = function() { return _featured; };
  this.isLocked = function() { return _locked; };
  this.isHideScoreUntilFinished = function() { return _hideScoreUntilFinished };
  this.getCreated = function() { return _created; };
  this.getModified = function() { return _modified; };
  this.getPublished = function() { return _published; };

  this.incrementScore = function(status) {
    if (status !== Status.FORBIDDEN) {
      if (!UserStore.isAuthenticated()) {
        var update = {};
        update[_id] = true;
        store.set(Stores.BEZZIST_QUESTIONS, _.extend(store.get(Stores.BEZZIST_QUESTIONS), update));
      }
      UserStore.addQuestionLiked(_id);
    }
    _score += 1;
  };

  this.decrementScore = function(status) {
    if (_score === 0) {
      return;
    }
    if (status !== Status.FORBIDDEN) {
      if (!UserStore.isAuthenticated()) {
        var votedQuestions = store.get(Stores.BEZZIST_QUESTIONS);
        delete votedQuestions[_id];
        store.set(Stores.BEZZIST_QUESTIONS, votedQuestions);
      }
      UserStore.removeQuestionLiked(_id);
    }
    _score -= 1;
  };
};


module.exports = Question;